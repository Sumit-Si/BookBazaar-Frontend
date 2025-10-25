import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider.jsx'

const PublicRoute = ({children}) => {
    const {authUser} = useAuth();

    if(authUser) {
        return <Navigate to={"/"} replace />
    }

  return children;
}

export default PublicRoute