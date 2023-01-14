import React from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from 'react-router-dom';
import { useState } from "react";
import { GlobalContext } from "../../../src/Utils/Context";
import { getRequest } from "../../Utils/APIUtils";

const API_KEY = "AIzaSyDYub39l5rplWuw4NHCAwDcaOErMXiU56I";

function Layout() {

    const storedEmail = localStorage.getItem('email');
    const storedToken = JSON.parse(localStorage.getItem('idToken'));
    const storedExpire = JSON.parse(localStorage.getItem('expiresIn'));
    const storedRegistered = JSON.parse(localStorage.getItem('registered'));
    const storedRefreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    const storedLogActiveState = JSON.parse(localStorage.getItem('logActiveState'));
    const storedProfileActiveState = JSON.parse(localStorage.getItem('profileActiveState'));

    const [email, setEmail] = useState(storedEmail);
    const [idToken, setIdToken] = useState(storedToken);
    const [registered, setRegistered] = useState(storedRegistered);
    const [expiresIn, setExpiresIn] = useState(storedExpire);
    const [refreshToken, setRefreshToken] = useState(storedRefreshToken);
    const [logActiveState, setLogActiveState] = useState(storedLogActiveState)
    const [profileActiveState, setProfileActiveState] = useState(storedProfileActiveState)
    

    const auth = {
        email,
        idToken,
        registered,
        expiresIn,
        refreshToken,
        signin: async (email, password) => {
            const resp = await getRequest(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, 'POST', {
                "email": email,
                "password": password,
                "returnSecureToken": true
            });

            
            if (resp.status === 200) {
                setEmail(resp.data.email);
                setIdToken(resp.data.idToken);
                setRegistered(resp.data.registered);
                setExpiresIn(resp.data.expiresIn);
                setRefreshToken(resp.data.refreshToken);
                setLogActiveState(true);
                setProfileActiveState(false);
                localStorage.setItem('email', resp.data.email)
                localStorage.setItem('idToken', JSON.stringify(resp.data.idToken))
                localStorage.setItem('expiresIn', JSON.stringify(resp.data.expiresIn))
                localStorage.setItem('registered', JSON.stringify(resp.data.registered))
                localStorage.setItem('refreshToken', JSON.stringify(resp.data.refreshToken))
                localStorage.setItem('logActiveState', JSON.stringify(true))
                localStorage.setItem('profileActiveState', JSON.stringify(false))
            }
            return resp
        },
        signup: async (email, password) => {
            const resp = await getRequest(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, 'POST', {
                "email": email,
                "password": password,
                "returnSecureToken": true
            });

            
            if (resp.status === 200) {
                setEmail(resp.data.email);
                setIdToken(resp.data.idToken);
                setExpiresIn(resp.data.expiresIn);
                setRefreshToken(resp.data.refreshToken);
                setRegistered(false);
                localStorage.setItem('email', resp.data.email)
                localStorage.setItem('idToken', JSON.stringify(resp.data.idToken))
                localStorage.setItem('expiresIn', JSON.stringify(resp.data.expiresIn))
                localStorage.setItem('refreshToken', JSON.stringify(resp.data.refreshToken))

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
            localStorage.clear();
        }
    }
    const changePassowrd = {
        email,
        idToken,
        expiresIn,
        refreshToken,
        newPassword: async (idToken, password) => {
            const resp = await getRequest(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`, 'POST', {
                "idToken": idToken,
                "password": password,
                "returnSecureToken": true
            });

            
            if (resp.status === 200) {
                setEmail(resp.data.email);
                setIdToken(resp.data.idToken);
                setExpiresIn(resp.data.expiresIn);
                setRegistered(false);
                setRefreshToken(resp.data.refreshToken);
                setLogActiveState(true);
                setProfileActiveState(false);
                localStorage.setItem('email', resp.data.email)
                localStorage.setItem('idToken', JSON.stringify(resp.data.idToken))
                localStorage.setItem('expiresIn', JSON.stringify(resp.data.expiresIn))
                localStorage.setItem('refreshToken', JSON.stringify(resp.data.refreshToken))
            }
            return resp
        }
    }
    const activeStates = {
        logActiveState,
        profileActiveState
    }
    return (
        <GlobalContext.Provider value={{ auth, changePassowrd, activeStates }}>
            <div className="App">
                <NavBar />
                <Outlet />
            </div>
        </GlobalContext.Provider >

    )
}
export default Layout;