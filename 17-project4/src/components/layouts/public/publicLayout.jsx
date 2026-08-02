import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header';

export const publicLayout = () => {
  return (
    <>
       { /*LAYOUT*/ }

       <Header/>

       {/*CONTENIDO PRINCIPAL*/}
<section className="layout_content">
        <Outlet />
      </section>
    
    </>
  )
}
