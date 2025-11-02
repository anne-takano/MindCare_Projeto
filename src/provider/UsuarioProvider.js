import { useState } from "react";
import UsuarioContext from "../context/UsuarioContext";

export default function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState({
    nomeUsuario: null,
  });

  const logIn = (nome) => {
    setUsuario({
      nomeUsuario: nome,
    });
  };

  const contextValue = {
    usuario,
    logIn,
  };

  return (
    <UsuarioContext.Provider value={contextValue}>
      {children}
    </UsuarioContext.Provider>
  );
}
