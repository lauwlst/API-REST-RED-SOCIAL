import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';
import { Header } from './Header';

export const PublicLayout = () => {
  const {auth} = useAuth();
  return (
    <>
       { /*LAYOUT*/ }

       <Header/>

       {/*CONTENIDO PRINCIPAL*/}
<section className="layout_content">
        <Outlet />
        :
        <Navigate to="/social" />
        
      </section>
    
    </>
  )
}
