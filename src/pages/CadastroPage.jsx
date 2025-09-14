import { useState } from "react";
import "./cadastro-page.estilos.css";
import Logotipo from "../components/Logotipo/Logotipo";
import BannerCadastro from "../components/BannerCadastro/BannerCadastro";
import CampoInput from "../components/CampoInput/CampoInput";
import Botao from "../components/Botao/Botao";

export default function CadastroPage({ actionNavigate }) {
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputRePassword, setInputRePassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onChangeUsername = (e) => setInputUsername(e.target.value);
  const onChangeEmail = (e) => setInputEmail(e.target.value);
  const onChangePassword = (e) => setInputPassword(e.target.value);
  const onChangeRePassword = (e) => setInputRePassword(e.target.value);

  const onClickCadastrar = () => {
    setMessage("");
    if (inputPassword == inputRePassword) {
      actionNavigate(0);
    } else {
      setMessage("As senhas não conferem.");
    }
  };

  return (
    <>
      <div className="cadastro-container">
        <Logotipo />
        <BannerCadastro />
        <div className="cadastro-form-container">
          <CampoInput
            type="text"
            placeholder="username"
            name="username"
            id="Username"
            autoComplete={"off"}
            value={inputUsername}
            onChange={onChangeUsername}
          />
          <CampoInput
            type="text"
            placeholder="e-mail"
            name="email"
            id="email"
            autoComplete={"off"}
            value={inputEmail}
            onChange={onChangeEmail}
          />

          <CampoInput
            type="password"
            placeholder="senha"
            name="senha"
            id="senha"
            value={inputPassword}
            onChange={onChangePassword}
          />
          <CampoInput
            type="password"
            placeholder="confirmar senha"
            name="senha"
            id="senha"
            value={inputRePassword}
            onChange={onChangeRePassword}
          />

          {message && <p>{message}</p>}
        </div>
        <Botao onClick={onClickCadastrar} disabled={isLoading}>
          Cadastrar
        </Botao>
      </div>
    </>
  );
}
