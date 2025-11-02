import { createContext } from "react";

const UsuarioContext = createContext({
  usuario: {
    nomeUsuario: null,
  },
  logIn: (nome) => {},
});

export default UsuarioContext;
