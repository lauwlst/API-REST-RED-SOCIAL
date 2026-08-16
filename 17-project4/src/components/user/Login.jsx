import React from 'react'
import { useState } from 'react';
import { Global } from '../../helpers/Global';
import {useform} from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';


export const Login = () => {

  const { form, changed } = useform {()};
  const [saved, setSaved] = useState("not_sended");

  const { setAuth } = useAuth;

  const loginUser = async(e) => {
    e.preventDefault();

    //Datos del formulario
    let userToLogin= form;

    // Petición al backend
    const request = await fetch (Global.url+'user/login', {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type":"application/json"
      }
    });
    const data= request.json();


    if(data.status == "success") {

      // Persistir los datos en el navegador
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify (data.user));
      setSaved("login");

      //Set datos en el auth
      SetAuth(data.user);

      //Redirección
      setTimeout(() => {
        window.location.reload()
      }, 1000);

    }else{
      setSaved("error");
    }

  }
  return (
     <>
      <header className="content__header content__header--public">
                <h1 className="content__title">Login</h1>
            </header>
            <div className="content__posts">

                   {saved == "login" ?
              <strong className="alert alert-success"> "Usuario identificado correctamente !! </strong>
              : ''} 

              {saved == "error" ?
                <strong className="alert alert-danger"> "Usuario no se ha identificado !! </strong>
                : ''}

              <form className= 'form-login' onSubmit={loginUser}>

                <div className='form-group'>
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" on-change= {changed} />
                </div>

                 <div className='form-group'>
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" name="password" on-change= {changed} />
                </div>

                <input type="submit" value="Identificate" className= "btn btn-success"/>

                


              

              </form>

            </div>
    </>
  )
}
