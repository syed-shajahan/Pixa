import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { auth } from '../../fireBaseConfig';
const ProtectedRoutes = () => {

  const currentUserLogin = auth.currentUser;
  return (
    currentUserLogin ? (
      <Outlet />
    ) : (
      <Navigate to='/login' />
    )
  )
}

export default ProtectedRoutes