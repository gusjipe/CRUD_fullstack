import React  from 'react'
import { Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/contextProvider';
import { Navigate } from 'react-router-dom';

const GuestLayout = () => {

    const  {token} = useStateContext();
    
    if (token ) {
        return <Navigate to="/" />
    }
  return (
    <div>
        <div>

        
        <Outlet />
            
        </div>
        
    </div>
  )
}

export default GuestLayout