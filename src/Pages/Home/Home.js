import React, { useContext } from "react";
import { GlobalContext } from "../../Utils/Context";

import "./Home.scss"
function Home() {
    const auth = useContext(GlobalContext).auth;
    console.log(auth);
    return (
        <div>
            <div className="welcome text-center fw-semibold mt-5">Welcome on Board! </div>

        </div>
    )
}
export default Home;