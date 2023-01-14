import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import React from "react";
import Login from "./Pages/Login/Login";
import Layout from "./Components/Layout/Layout";
import Profile from "./Pages/Profile/Profile";
import Home from "./Pages/Home/Home";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";



class App extends React.Component {

  render() {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route element={<Layout />} errorElement={<PageNotFound />}>

          <Route path={"/login"} element={<Login />} />
          <Route path={"/profile"} element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path={"/"} element={<RequireAuth><Home /></RequireAuth>} />

        </Route>   

      )

    )
    return <RouterProvider router={router} />
  }

}

export default App;
