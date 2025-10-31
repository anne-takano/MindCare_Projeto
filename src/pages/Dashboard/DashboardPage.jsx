import { useState, useEffect } from "react";
import style from "./dashboard-page.module.css";
import Botao from "../../components/Botao/Botao";
import FotoDePerfil from "../../components/FotoDePerfil/FotoDePerfil";

export default function DashboardPage({ user }) {
  // estado para salvar dados do usuário
  const [usuario, setUsuario] = useState({});
  // estado para salvar dados das sessões
  const [sessoes, setSessoes] = useState([]);
  // estado para renderizar a página após finalizar o fetch
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // busca dados do usuário na base de dados
    const fetchDadosUsuario = async () => {
      const response = await fetch(`users/${user}.json`);
      const data = await response.json();
      setUsuario(data);
    };
    // busca dados das sessões na base de dados
    const fetchSessoes = async () => {
      const response = await fetch(`sessoes/${user}.json`);
      const data = await response.json();
      setSessoes(data);
      // muda o estado de loading para falso para renderizar a página
      setLoading(false);
    };
    fetchDadosUsuario();
    fetchSessoes();
  }, [user]);

  function renderPage() {
    return (
      <div className={style.container}>
        <h2>Consultas agendadas</h2>
        <Botao>Marcar outra consulta</Botao>
        <h3>Você tem {sessoes.quantSessoes} sessões agendadas</h3>
        <div className={style.cardContainer}>
          {/* map para renderizar todas as sessões do usuário */}
          {sessoes.sessoes.map((sessao) => (
            <div className={style.card}>
              <FotoDePerfil img={sessao.img} />
              <p>
                <strong>Terapeuta:</strong> {sessao.terapeuta}
              </p>
              <p>
                <strong>Data:</strong> {sessao.data}
              </p>
              <p>
                <strong>Horário:</strong> {sessao.horario}
              </p>
              <p>
                <strong>Status:</strong> {sessao.status}
              </p>
              <div className={style.btnContainer}>
                <Botao>Enviar mensagem</Botao>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return !loading && renderPage();
}
