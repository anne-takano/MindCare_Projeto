import { useState, useEffect } from "react";
import style from "./dashboard-page.module.css";
import Botao from "../../components/Botao/Botao";

export default function DashboardPage({ user }) {
  const [usuario, setUsuario] = useState({});
  const [sessoes, setSessoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDadosUsuario = async () => {
      const response = await fetch(`users/${user}.json`);
      const data = await response.json();
      setUsuario(data);
    };
    const fetchSessoes = async () => {
      const response = await fetch(`sessoes/${user}.json`);
      const data = await response.json();
      setSessoes(data);
      setLoading(false);
    };
    fetchDadosUsuario();
    fetchSessoes();
  }, []);

  function renderPage() {
    return (
      <div className={style.container}>
        <h2>
          Bem vindo, {usuario.nome} {usuario.sobrenome}!
        </h2>
        <Botao>Marcar consulta</Botao>
        <h3>Você tem {sessoes.quantSessoes} sessões agendadas</h3>
        <div className={style.cardContainer}>
          {sessoes.sessoes.map((sessao) => (
            <div className={style.card}>
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
            </div>
          ))}
        </div>
      </div>
    );
  }

  return !loading && renderPage();
}
