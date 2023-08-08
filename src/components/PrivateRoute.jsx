import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { user } = useAuthContext();

  return (
    user ? <Outlet/ > : <Navigate to='/login' />
  )
}

export default PrivateRoute
