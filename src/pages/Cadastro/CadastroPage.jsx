import { useState } from "react";
import styles from "./cadastro-page.module.css";
import Logotipo from "../../components/Logotipo/Logotipo";
import BannerCadastro from "../../components/BannerCadastro/BannerCadastro";
import CampoInput from "../../components/CampoInput/CampoInput";
import Botao from "../../components/Botao/Botao";
import SelectGenero from "../../components/SelectGenero/SelectGenero";

export default function CadastroPage({ goToPage }) {
  const [inputNome, setInputNome] = useState("");
  const [inputSobrenome, setInputSobrenome] = useState("");
  const [inputCPF, setInputCPF] = useState("");
  const [inputDataNascimento, setInputDataNascimento] = useState("");
  const [inputGenero, setInputGenero] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputRePassword, setInputRePassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [cpfMessage, setCpfMessage] = useState("");
  const [senhaMessage, setSenhaMessage] = useState("");

  const onChangeNome = (e) => setInputNome(e.target.value);
  const onChangeSobrenome = (e) => setInputSobrenome(e.target.value);
  const onChangeCPF = (e) => {
    // REGEX: remove tudo que não é número
    let valor = e.target.value.replace(/\D/g, "");

    // Limita a 11 números
    if (valor.length > 11) valor = valor.slice(0, 11);

    // Aplica máscara: 000.000.000-00
    if (valor.length > 3) valor = valor.replace(/^(\d{3})(\d)/, "$1.$2");
    if (valor.length > 6)
      valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    if (valor.length > 9)
      valor = valor.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

    setInputCPF(valor);
  };

  const onChangeDataNascimento = (e) => setInputDataNascimento(e.target.value);
  const onChangeGenero = (e) => setInputGenero(e.target.value);
  const onChangeEmail = (e) => setInputEmail(e.target.value);
  const onChangePassword = (e) => setInputPassword(e.target.value);
  const onChangeRePassword = (e) => setInputRePassword(e.target.value);

  const onSubmitCadastrar = (e) => {
    e.preventDefault();
    let valid = true;

    // Validação senha
    if (inputPassword !== inputRePassword) {
      setSenhaMessage("As senhas não conferem.");
      valid = false;
    } else {
      setSenhaMessage("");
    }

    // Validação CPF
    if (inputCPF.replace(/\D/g, "").length !== 11) {
      setCpfMessage("O CPF deve conter 11 números.");
      valid = false;
    } else {
      setCpfMessage("");
    }

    if (!valid) return;

    goToPage("LoginPage");
  };

  return (
    <>
      <div className={styles.cadastroContainer}>
        <Logotipo />
        <BannerCadastro />
        <form
          className={styles.cadastroFormContainer}
          onSubmit={onSubmitCadastrar}
        >
          <CampoInput
            type="text"
            placeholder="Nome"
            name="nome"
            id="nome"
            autoComplete={"off"}
            value={inputNome}
            onChange={onChangeNome}
          />

          <CampoInput
            type="text"
            placeholder="Sobrenome"
            name="sobrenome"
            id="sobrenome"
            autoComplete={"off"}
            value={inputSobrenome}
            onChange={onChangeSobrenome}
          />

          <CampoInput
            type="text"
            placeholder="CPF"
            name="cpf"
            id="cpf"
            autoComplete="off"
            value={inputCPF}
            onChange={onChangeCPF}
          />

          {cpfMessage && <p className={styles.mensagemErro}>{cpfMessage}</p>}

          <CampoInput
            type="date"
            placeholder="Data de Nascimento"
            name="data_de_nascimento"
            id="data_de_nascimento"
            value={inputDataNascimento}
            onChange={onChangeDataNascimento}
            min="1900-01-01"
            max="2025-12-31"
          />

          <SelectGenero
            id="genero"
            name="genero"
            value={inputGenero}
            onChange={onChangeGenero}
          />

          <CampoInput
            type="email"
            placeholder="E-mail"
            name="email"
            id="email"
            autoComplete={"off"}
            value={inputEmail}
            onChange={onChangeEmail}
          />

          <CampoInput
            type="password"
            placeholder="Senha"
            name="senha"
            id="senha"
            value={inputPassword}
            onChange={onChangePassword}
          />

          <CampoInput
            type="password"
            placeholder="Confirmar senha"
            name="senha"
            id="senha"
            value={inputRePassword}
            onChange={onChangeRePassword}
          />
          {senhaMessage && (
            <p className={styles.mensagemErro}>{senhaMessage}</p>
          )}

          <Botao type="submit" disabled={isLoading}>
            Cadastrar
          </Botao>
        </form>
      </div>
    </>
  );
}
