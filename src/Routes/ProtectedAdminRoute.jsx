import React from "react"
import {Navigate} from "react-router-dom"
import {useCookiesContext} from "../utils/CookieManager"


export default  function ProtectedCustomerRoute({ children }) {
const { cookies } = useCookiesContext();
    
    if(cookies.token){
        return children;
    }

    return <Navigate to="/account/login" replace />;
}

export  function ProtectedAdminRoute({ children }) {
const { cookies } = useCookiesContext();
    
if(cookies.role && cookies.role.includes("Adminstration")){
    return children;
}

    return <Navigate to="/unauthorized"  />;
}


