import { useState, useEffect, useMemo } from "react";
import styles from "./buscar-terapeutas-page.module.css";
import FotoDePerfil from "../../components/FotoDePerfil/FotoDePerfil";
import CampoInput from "../../components/CampoInput/CampoInput";
import { calcularDistancia } from "../../utils/calculadoraDistancia";
import { filtrarETOrdenarTerapeutas } from "../../utils/buscaInteligente";

export default function BuscarTerapeutasPage({ user }) {
  const [terapeutasOriginais, setTerapeutasOriginais] = useState([]);
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    const buscarDados = async () => {
      try {
        let pacienteEncontrado = null;

        // Buscar dados do paciente logado
        if (user) {
          const responsePaciente = await fetch(
            `users/pacientes/pacientes.json`
          );
          const dataPaciente = await responsePaciente.json();
          pacienteEncontrado = Array.isArray(dataPaciente)
            ? dataPaciente.find((p) => p.username === user)
            : (dataPaciente && dataPaciente[user]) || null;
          setPaciente(pacienteEncontrado);
        }

        // Buscar lista de terapeutas
        const responseTerapeutas = await fetch(
          `users/terapeutas/terapeutas.json`
        );
        const dataTerapeutas = await responseTerapeutas.json();

        // Calcular distância e ordenar por proximidade
        if (
          pacienteEncontrado &&
          pacienteEncontrado.latitude &&
          pacienteEncontrado.longitude
        ) {
          const terapeutasComDistancia = dataTerapeutas.map((terapeuta) => {
            if (terapeuta.latitude && terapeuta.longitude) {
              const distancia = calcularDistancia(
                pacienteEncontrado.latitude,
                pacienteEncontrado.longitude,
                terapeuta.latitude,
                terapeuta.longitude
              );
              return { ...terapeuta, distancia };
            }
            return { ...terapeuta, distancia: null };
          });

          // Ordenar por distância (mais próximo primeiro)
          terapeutasComDistancia.sort((a, b) => {
            if (a.distancia === null) return 1;
            if (b.distancia === null) return -1;
            return a.distancia - b.distancia;
          });

          setTerapeutasOriginais(terapeutasComDistancia);
        } else {
          // Se não tiver coordenadas do paciente, mostrar sem ordenação
          setTerapeutasOriginais(dataTerapeutas);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarDados();
  }, [user]);

  // Aplica o filtro de busca inteligente
  const terapeutasFiltrados = useMemo(() => {
    if (!termoBusca.trim()) {
      return terapeutasOriginais;
    }
    return filtrarETOrdenarTerapeutas(terapeutasOriginais, termoBusca);
  }, [terapeutasOriginais, termoBusca]);

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <p>Carregando terapeutas...</p>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Buscar terapeutas</h2>
      {!paciente?.latitude || !paciente?.longitude ? (
        <p className={styles.subtitle}>
          Complete seu endereço no perfil para ver terapeutas ordenados por
          proximidade.
        </p>
      ) : (
        <p className={styles.subtitle}>
          Terapeutas ordenados por proximidade da sua localização.
        </p>
      )}

      <div className={styles.filtroContainer}>
        <input
          type="text"
          placeholder="Buscar por nome, especialidade, cidade..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          className={styles.inputBusca}
        />
        {termoBusca && (
          <p className={styles.resultadoBusca}>
            {terapeutasFiltrados.length} terapeuta(s) encontrado(s)
          </p>
        )}
      </div>

      <div className={styles.listaTerapeutas}>
        {terapeutasFiltrados.length > 0 ? (
          terapeutasFiltrados.map((terapeuta) => (
          <div key={terapeuta.id} className={styles.cardTerapeuta}>
            <FotoDePerfil img={terapeuta.img} />
            <div className={styles.infoTerapeuta}>
              <h3 className={styles.nomeTerapeuta}>{terapeuta.nome}</h3>
              <p className={styles.especialidade}>
                <strong>Especialidade:</strong> {terapeuta.especialidade}
              </p>
              <p className={styles.crp}>
                <strong>CRP:</strong> {terapeuta.crp}
              </p>
              <p className={styles.avaliacao}>
                <strong>Avaliação:</strong> {terapeuta.avaliacao} ⭐ (
                {terapeuta.numeroAvaliacoes} avaliações)
              </p>
              <p className={styles.endereco}>
                <strong>Endereço:</strong> {terapeuta.endereco}
              </p>
              {terapeuta.distancia !== null && (
                <p className={styles.distancia}>
                  <strong>Distância:</strong> {terapeuta.distancia} km
                </p>
              )}
              <p className={styles.valor}>
                <strong>Valor da primeira consulta:</strong> R$ {terapeuta.valorPrimeiraConsulta}
              </p>
              <p className={styles.data}>
                <strong>Próxima data disponível:</strong>{" "}
                {new Date(terapeuta.proximaDataDisponivel).toLocaleDateString(
                  "pt-BR"
                )}
              </p>
              {terapeuta.horariosDisponiveis &&
                terapeuta.horariosDisponiveis.length > 0 && (
                  <div className={styles.horariosContainer}>
                    <p className={styles.horariosLabel}>
                      <strong>Horários disponíveis:</strong>
                    </p>
                    <div className={styles.botoesHorarios}>
                      {terapeuta.horariosDisponiveis.map((horario, index) => (
                        <button
                          key={index}
                          className={styles.botaoHorario}
                          onClick={() => {
                            const dataFormatada = new Date(
                              terapeuta.proximaDataDisponivel
                            ).toLocaleDateString("pt-BR");
                            alert(
                              `Consulta agendada com sucesso!\n\nTerapeuta: ${terapeuta.nome}\nData: ${dataFormatada}\nHorário: ${horario}`
                            );
                          }}
                        >
                          {horario}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
          ))
        ) : (
          <div className={styles.semResultados}>
            <p>Carregando terapeutas...</p>
          </div>
        )}
      </div>
    </div>
  );
}
