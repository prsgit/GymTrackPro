//este es un useContext para compartir información entre componentes
//Envolveremos toda la aplicación con este contexto para poder usarla en todos los componentes
//Lo usaremos en route.jsx

import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Global } from "../helpers/Global";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    //Sacar datos del usuario del localstorage.

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    console.log(token);
    console.log(user);

    //Comprobar si tengo el token y el user.

    if (!token || !user) {
      return false;
    }

    //Transformar los datos a un objeto de js.

    const userObj = JSON.parse(user);
    const userId = userObj._id;

    console.log(userObj);
    console.log(userId);

    //Petición ajax al back , comprueba el token y devuelve todos los datos del usuario.

    const request = await fetch(Global.url + "user/profile/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();

    //Asignar un nuevo valor al estado de auth. (setear)

    setAuth(data.user);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
