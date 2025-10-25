import { useState, useEffect } from "react";
import style from "./home-page.module.css";
import FotoDePerfil from "../../components/FotoDePerfil/FotoDePerfil";
import Icon from "../../components/Icon/Icon";

export default function HomePage({ user, goToPage }) {
  // estado para salvar dados do usuário
  const [usuario, setUsuario] = useState({});
  // estado para renderizar a página após finalizar o fetch
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // busca dados do usuário na base de dados
    const fetchDadosUsuario = async () => {
      const response = await fetch(`users/${user}.json`);
      const data = await response.json();
      setUsuario(data);
      setLoading(false);
    };
    fetchDadosUsuario();
  }, []);

  function renderPage() {
    return (
      <div className={style.container}>
        <h2 className={style.titulo}>Olá, {usuario.nome}!</h2>
        <div className={style.cardInfo}>
          <FotoDePerfil img={usuario.img} />
          <div className={style.cardInfoUsuario}>
            <h3>
              {usuario.nome} {usuario.sobrenome}
            </h3>
            <p>CPF: {usuario.cpf}</p>
            <p>Data de nascimento: {usuario.dataNascimento}</p>
          </div>
        </div>
        <div className={style.cardAcoesWrapper}>
          <h3>O que você precisa hoje?</h3>
          <div className={style.cardAcoesOpcoes}>
            <div className={`${style.cardAcoesOpcao} ${style.terapeutas}`}>
              <Icon iconName="person_pin_circle" />
              <p>Buscar terapeutas</p>
            </div>
            <div
              className={`${style.cardAcoesOpcao} ${style.agendamentos}`}
              onClick={() => goToPage("DashboardPage")}
              style={{ cursor: "pointer" }}
            >
              <Icon iconName="calendar_month" />
              <p>Consultar agendamentos</p>
            </div>
            <div className={`${style.cardAcoesOpcao} ${style.reembolso}`}>
              <Icon iconName="request_quote" />
              <p>Solicitar reembolso</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return !loading && renderPage();
}
