import React from "react";
import { Link,useRouteError } from "react-router-dom";
import './PageNotFound.scss'

function PageNotFound() {
    const errRoute = useRouteError();

    //console.log(errRoute);
    return (
        <div className="page-not-found">
            <div className="wrapper">
                <div className="text-title">
                    {errRoute.status === 404 ?
                        <span>
                            Sorry, 404 page not found ...
                        </span>

                        :
                        <span>
                            Sorry, Something went Wrong ...
                        </span>
                    }
                </div>
                <Link className="text-body btn mt-5 btn-link fw-bold" to='/login'>Return to your home page</Link>
            </div>
        </div>
    )
}
export default PageNotFound;