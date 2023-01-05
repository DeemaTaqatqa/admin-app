import React, { useState } from "react";
import { useContext } from 'react';
import { GlobalContext } from "../../Utils/Context";
import { useNavigate } from 'react-router-dom';
import "./NavBar.scss";

//@Todo to use the state instead of changing in button

function NavBar() {
    //const [btnState, setBtnState] = useState("Login")
    

    const auth = useContext(GlobalContext).auth;
    const changePassowrd = useContext(GlobalContext).changePassowrd;
    //const isRegistered = auth.isRegistered
    const isRegistered = auth.registered
    const [profileActiveState, setProfileActiveState] = useState(changePassowrd.profileActiveState)
    const [logActiveState, setLogActiveState] = useState(changePassowrd.logActiveState)
    console.log(isRegistered)
    const navigate = useNavigate();
    //console.log(profileActiveState)
    //console.log(logActiveState)
   
    //console.log(auth.idToken);
    function onLogout() {
        //if (auth.email) {
            setProfileActiveState(false)
            setLogActiveState(true)
            auth.logout();
        //}

        navigate('/')
        //console.log(profileActiveState)
        //console.log(logActiveState)

    }
    function onProfileClicked() {
        console.log("click")
        setProfileActiveState(true)
        setLogActiveState(false)
        navigate('/profile')
        if(!isRegistered){
            setLogActiveState(true)
            setProfileActiveState(false)
        }
        console.log(profileActiveState)
        console.log(logActiveState)


    }
    //console.log(profileActiveState)
    return (
        <nav className="navbar navbar-expand-md px-5">
            <button type="button" className='navbar-toggler' data-bs-toggle="collapse" data-bs-target='#mainNavBar'>
                <span className='navbar-toggler-icon' />
            </button>
            <div className="collapse navbar-collapse ms-5" id="mainNavBar">
                <div className="navbar-nav-title text-white fs-3 fw-semibold"> React Auth</div>
                {isRegistered ?
                    <ul className="navbar-nav navbar-nav ms-auto mb-2 mb-lg-0 ">
                        {/* there is a bug when it's in home not in profile , profile button is active before clicking since it registered */}
                        <li className="navbar-nav-btn me-2">
                            <button onClick={onProfileClicked} className={`btn nav-link text-white fw-bold ${profileActiveState ? "active" : ""} `}>
                                Profile
                            </button>
                        </li>
                        <li className="navbar-nav-btn me-5">
                            <button onClick={onLogout} className={`btn nav-link text-white fw-bold ${logActiveState ? "active" : ""}`}>
                                {/* {`${isRegistered ? "Logout" : "Login"}`} */}
                                Logout
                            </button>
                        </li>

                    </ul>
                    :
                    <ul className="navbar-nav navbar-nav ms-auto mb-2 mb-lg-0 ">
                        <li className="navbar-nav-btn me-5">
                            <button className=" btn nav-link text-white fw-bold ">
                                Login
                            </button>
                        </li>
                    </ul>

                }
            </div>
        </nav>

    )
}
export default NavBar;