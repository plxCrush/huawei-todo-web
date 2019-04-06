import React from "react"
import {Route} from "react-router-dom"
import {Auth} from "../../utils"
import Login from "../../screens/public/login";

export const ProtectedRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        Auth.getCurrentUser()
            ? <Component {...props} />
            : <Login/>
    )}/>
);