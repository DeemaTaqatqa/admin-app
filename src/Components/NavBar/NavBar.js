import React, { useState, useEffect } from "react";
import { useContext } from 'react';
import { GlobalContext } from "../../Utils/Context";
import { Link, useLocation } from 'react-router-dom';
import "./NavBar.scss";


function NavBar() {

    const auth = useContext(GlobalContext).auth;
    const activeStates = useContext(GlobalContext).activeStates;
    const _logActiveState = activeStates.logActiveState;
    const _profileActiveState = activeStates.profileActiveState;

    console.log(_logActiveState);
    console.log(_profileActiveState);

    const isRegistered = auth.registered;
    const [logActiveState, setLogActiveState] = useState(_logActiveState)
    const [profileActiveState, setProfileActiveState] = useState(_profileActiveState)
    const location = useLocation();

    console.log(auth)


    // console.log(activeStates);
    console.log(logActiveState);
    console.log(profileActiveState);
   
    useEffect(() => {
        if ("/profile" === location.pathname) {
            setProfileActiveState(true)
            setLogActiveState(false)
        } else {
            setProfileActiveState(false)
            setLogActiveState(true)
        }

    }, [location])

    function onLogout() {
        auth.logout();
    }

    return (
        <nav className="navbar navbar-expand-md px-5">
            <button type="button" className='navbar-toggler' data-bs-toggle="collapse" data-bs-target='#mainNavBar'>
                <span className='navbar-toggler-icon' />
            </button>
            <div className="collapse navbar-collapse ms-5" id="mainNavBar">
                <div className="navbar-nav-title text-white fs-3 fw-semibold"> React Auth</div>
                {isRegistered ?
                    <ul className="navbar-nav navbar-nav ms-auto mb-2 mb-lg-0 ">
                        <Link className="link-text" to="/profile">
                            <li className="navbar-nav-btn me-2">
                                <button className={`btn nav-link text-white fw-bold ${profileActiveState ? "active" : ""} `}>
                                    Profile
                                </button>
                            </li>
                        </Link>
                        <Link className="link-text" to="/login">
                            <li className="navbar-nav-btn me-5">
                                <button onClick={onLogout} className={`btn nav-link text-white fw-bold ${logActiveState ? "active" : ""}`}>
                                    {/* {`${isRegistered ? "Logout" : "Login"}`} */}
                                    Logout
                                </button>
                            </li>
                        </Link>

                    </ul>
                    :

                    <ul className="navbar-nav navbar-nav ms-auto mb-2 mb-lg-0 ">
                        <Link className="link-text" to="/login">
                            <li className="navbar-nav-btn me-5">
                                <button className=" btn nav-link text-white fw-bold ">
                                    Login
                                </button>
                            </li>
                        </Link>

                    </ul>

                }
            </div>
        </nav>
    )
}
export default NavBar;