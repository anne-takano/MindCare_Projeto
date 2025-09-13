import { useState } from "react";

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
      <h2>Cadastro:</h2>
      <section>
        <input
          type="text"
          placeholder="username"
          name="username"
          id="Username"
          autoComplete={"off"}
          value={inputUsername}
          onChange={onChangeUsername}
        />
        <input
          type="text"
          placeholder="e-mail"
          name="email"
          id="email"
          autoComplete={"off"}
          value={inputEmail}
          onChange={onChangeEmail}
        />

        <input
          type="password"
          placeholder="senha"
          name="senha"
          id="senha"
          value={inputPassword}
          onChange={onChangePassword}
        />
        <input
          type="password"
          placeholder="confirmar senha"
          name="senha"
          id="senha"
          value={inputRePassword}
          onChange={onChangeRePassword}
        />

        <button onClick={onClickCadastrar} disabled={isLoading}>
          Cadastrar
        </button>
        {message && <p>{message}</p>}
      </section>
    </>
  );
}
