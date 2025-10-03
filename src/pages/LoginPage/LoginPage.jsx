import { useState } from "react";
import Logotipo from "../../components/Logotipo/Logotipo";
import BannerCadastro from "../../components/BannerCadastro/BannerCadastro";
import CampoInput from "../../components/CampoInput/CampoInput";
import Botao from "../../components/Botao/Botao";
import styles from "./login-page.module.css";

export default function LoginPage({ goToPage, updateUser }) {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onChangeUsername = (e) => setInputUsername(e.target.value);
  const onChangePassword = (e) => setInputPassword(e.target.value);

  const onClickAcessar = () => {
    setMessage("");
    setLoading(true);

    fetch(`users/${inputUsername}.json`)
      .then((response) => response.json())
      .then((user) => {
        if (user.senha === inputPassword) {
          //Atualiza o user, o qual sera passado para o dashboard page
          updateUser(inputUsername);
          goToPage("DashboardPage");
        } else {
          setMessage("Senha não confere.");
        }
      })
      .catch(() => setMessage("Usuário não encontrado."))
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginPageContent}>
        <div className={styles.header}>
          <Logotipo />
          <BannerCadastro
            className={styles.headerHeadings}
            titulo="Entre na sua conta"
            subtitulo="Ainda não tem cadastro?"
            onClick={() => goToPage("CadastroPage")}
            texto="Cadastre-se"
          />
        </div>
        <div className={styles.main}>
          <form className={styles.loginFormContainer} onSubmit={onClickAcessar}>
            <CampoInput
              type="text"
              placeholder="username"
              name="username"
              id="username"
              autoComplete={"off"}
              value={inputUsername}
              onChange={onChangeUsername}
            />

            <CampoInput
              type="password"
              placeholder="senha"
              name="senha"
              id="senha"
              autoComplete={"off"}
              value={inputPassword}
              onChange={onChangePassword}
            />

            <div className={styles.message}>
              {isLoading && <p>Verificando credenciais...</p>}
              {message && <p>{message}</p>}
              <a>Esqueceu a senha?</a>
            </div>

            <Botao onClick={onClickAcessar} disabled={isLoading}>
              Acessar
            </Botao>
          </form>
        </div>
      </div>
    </div>
  );
}
