import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import style from "./home-page.module.css";
import FotoDePerfil from "../../components/FotoDePerfil/FotoDePerfil";
import Icon from "../../components/Icon/Icon";
import NavBar from "../../components/NavBar/NavBar";
import UsuarioContext from "../../context/UsuarioContext";

export default function HomePage({ user, goToPage }) {
  // estado para salvar dados do usuário
  const [usuario, setUsuario] = useState({});
  // estado para renderizar a página após finalizar o fetch
  const [loading, setLoading] = useState(true);

  const usuarioContext = useContext(UsuarioContext);
  const nomeUsuario = usuarioContext.usuario.nomeUsuario;

  useEffect(() => {
    // busca dados do usuário na base de dados
    const fetchDadosUsuario = async () => {
      const response = await fetch(`users/pacientes/pacientes.json`);
      const data = await response.json();
      const paciente = Array.isArray(data)
        ? data.find((p) => p.username === nomeUsuario)
        : (data && data[nomeUsuario]) || null;
      setUsuario(paciente || {});
      setLoading(false);
    };
    fetchDadosUsuario();
  }, [usuarioContext]);

  function renderPage() {
    return (
      <>
        <NavBar />
        <div className={style.pageContainer}>
          <div className={style.userSection}>
            <h2 className={style.welcomeTitle}>Olá, {usuario.nome}!</h2>
            <div className={style.userCard}>
              <FotoDePerfil img={usuario.img} />
              <div className={style.userDetails}>
                <p>
                  <b>
                    {usuario.nome} {usuario.sobrenome}
                  </b>
                </p>
                <p>
                  <b>CPF:</b> {usuario.cpf}
                </p>
                <p>
                  <b>Data de nascimento:</b> {usuario.dataNascimento}
                </p>
                <p>
                  <b>Cidade:</b> {usuario.cidade} ({usuario.estado})
                </p>
              </div>
            </div>
          </div>
          <div className={style.actionsSection}>
            <h3>O que você precisa hoje?</h3>
            <div className={style.actionsGrid}>
              <Link to="/buscarTerapeutas" style={{ textDecoration: "none" }}>
                <div
                  className={`${style.actionCard} ${style.terapeutas}`}
                  // onClick={() => goToPage("BuscarTerapeutasPage")}
                  style={{ cursor: "pointer" }}
                >
                  <Icon iconName="person_pin_circle" />
                  <p>Buscar terapeutas</p>
                </div>
              </Link>
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <div
                  className={`${style.actionCard} ${style.agendamentos}`}
                  // onClick={() => goToPage("DashboardPage")}
                  style={{ cursor: "pointer" }}
                >
                  <Icon iconName="calendar_month" />
                  <p>Consultar agendamentos</p>
                </div>
              </Link>
              <div className={`${style.actionCard} ${style.reembolso}`}>
                <Icon iconName="request_quote" />
                <p>Solicitar reembolso</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return !loading && renderPage();
}
