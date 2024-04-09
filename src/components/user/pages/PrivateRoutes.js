import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../AuthContext'

const PrivateRoute = () => {
    let {user} = useContext(AuthContext)

    return user ? <Outlet /> : <Navigate to="/login" />;
}
export const TalentsPrivateRoutes=() => {
    let {user} = useContext(AuthContext)
    return user.role==='talent' ? <Outlet /> : <Navigate to={`/${user?.role}`} />;
}
export const ScoutsPrivateRoutes=() => {
    let {user} = useContext(AuthContext)
    return user?.role==='scout' ? <Outlet /> : <Navigate to={`/${user?.role}`} />;
}
export const AdminsPrivateRoutes =() => {
    let {user} = useContext(AuthContext)
    return user.role==='admin' ? <Outlet /> : <Navigate to={`/${user?.role}`} />;
}


export const RedirectToHome=()=>{
    let {user} = useContext(AuthContext)
    return <Navigate to={`/${user?.role}`}/>
}
export default PrivateRoute;