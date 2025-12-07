import React from 'react'
import { getUser } from '../../Services/userServices'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const Protected = () => {
    const location=useLocation()
  return (
       getUser()?<Outlet/> :<Navigate to="/login" state={{from:location.pathname}}/>
  )
}

export default Protected