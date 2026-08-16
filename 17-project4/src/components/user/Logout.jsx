import React from 'react'

export const Logout = () => {
    const{setAuth, setCounters} = useAuth();

    const navigate = useNavigate();

    useEffect(() =>{
        //Vaciar el localstorage
        localStorage.clear();

        //Setear estados globales a vacío
        setAuth({});
        setCounters({});

        //Navigate (redireccion) al login
        navigate("/login");



    });
  return (
    <h1>Cerrando sesión...</h1>
  )
}
