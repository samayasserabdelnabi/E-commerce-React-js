import { Navigate } from "react-router-dom";

export function ProtectingRouting({ children }) {


    if (localStorage.getItem("userToken") != null) {
        return children
    } else {
        return <Navigate to='/login' />
    }

}