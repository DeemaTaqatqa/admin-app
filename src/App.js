import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import React from "react";
import Login from "./Pages/Login/Login";
import Layout from "./Components/Layout/Layout";
import Profile from "./Pages/Profile/Profile";
import Home from "./Pages/Home/Home";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";



//@TODO : we will handle it later and other errors
//@TODO : responsive 



class App extends React.Component {

  render() {
    const router = createBrowserRouter(
      createRoutesFromElements(
        // I have to add error routing
        <Route element={<Layout />} errorElement={<PageNotFound />}>

          <Route path={'/'} element={<Login />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/home"} element={<Home />} />

          {/*<Route path={"/info/:id"} element={<Info />} /> */}
        </Route>

      )

    )
    return <RouterProvider router={router} />
  }

}

export default App;
