import { useState } from "react";

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
          setMessage("Usuário e senha não confere.");
        }
      })
      .catch(() => setMessage("Usuário não encontrado."))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <h2>Login:</h2>
      <section>
        <input
          type="text"
          placeholder="Username"
          name="username"
          id="Username"
          autoComplete={"off"}
          value={inputUsername}
          onChange={onChangeUsername}
        />
        <input
          type="password"
          placeholder="senha"
          name="senha"
          id="senha"
          value={inputPassword}
          onChange={onChangePassword}
        />
        <button onClick={onClickAcessar} disabled={isLoading}>
          Acessar
        </button>
        {isLoading && <p>Verificando credenciais...</p>}
        {message && <p>{message}</p>}
        <p>
          Ainda não tem cadastro?{" "}
          <a onClick={() => goToPage("CadastroPage")}>Cadastre-se</a>
        </p>
      </section>
    </>
  );
}
