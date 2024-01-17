import React, { useState } from "react";
import { Outlet,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute() {
    
    const[d,setD] = useState(useSelector((state) => state.user.login))
  
    
  
    const user = d;
    return ( 
        user ? <Outlet></Outlet> : <Navigate to="/"></Navigate>
     );
}

export default ProtectedRoute;