import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/contextProvider'
import axiosClient from '../axios-client'





const DefaultLayout = () => {
    const {user, token,notification, setUser, setToken} = useStateContext()

    useEffect(()=>{
        axiosClient.get('/user')
            .then(({data})=>{
                setUser(data)
            })
    },[])

    const onLogout = ( ev) =>{
        ev.preventDefault()

        axiosClient.post('/logout')
            .then(()=>{
                setUser({})
                setToken(null)
            })
    }

    
    if (!token){
        return <Navigate to="/login" />
    }
  return (
    <div id="defaultLayout">
        <aside>
            <Link to= "/dashboard">Dashboard</Link>
            <Link to= "/users">Users</Link>
        </aside>
        <div className="content">
            <div>{ notification && <div className="notification">{notification}</div>}</div>
            <header>
                
                <div>
                   
                    {user.name}
                    <a href="#" onClick={onLogout} className="btn-out" style={{}}>Logout</a>
                </div>
            </header>
            <main><Outlet /></main>
        </div>
        
    </div>
  )
}

export default DefaultLayout