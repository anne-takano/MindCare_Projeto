import { useState, useEffect } from "react";
import "./perfil-page.estilos.css";
import "../styles.css";

// Para simular a imagem do usuário
const defaultUserImage = "https://i.pravatar.cc/300";

export default function PerfilPage() {
  // `null` no início para indicar que os dados ainda não foram carregados.
  const [userData, setUserData] = useState(null);
  // Isso permite que o usuário edite os dados
  // sem alterar o estado original `userData` até que o botão "Salvar" seja clicado.
  const [formData, setFormData] = useState({});
  // `editMode` controla a visualização da página. Se for `false`,
  // o usuário vê os dados do perfil; se for `true`, o formulário de edição aparece.
  const [editMode, setEditMode] = useState(false);
  // `message` é usado para exibir feedback ao usuário, como "Perfil atualizado!"
  // ou "edição cancelada.".
  const [message, setMessage] = useState("");
  useEffect(() => {
    // Esta função simula a busca dos dados do usuário logado.
    // em um proximo passo faremos uma chamada a uma API (ex: `fetch('/api/user/profile')`).
    const fetchUserData = () => {
      // Dados dinâmicos que viriam de uma fonte externa como json ou BD.
      const user = {
        nome: "Caio",
        sobrenome: "Silva",
        cpf: "123.456.789-00",
        email: "caio.silva@email.com",
        username: "caiosilva",
        genero: "",
        dataNascimento: "",
        telefone: "",
        profissao: "",
        estadoCivil: "",
      };
      // Atualizamos os estados com os dados carregados.
      setUserData(user);
      setFormData(user);
    };
    fetchUserData();
  }, []);

  // Se `userData` ainda for `null`, mostramos uma mensagem de carregamento.
  if (!userData) {
    return <div>Carregando perfil...</div>;
  }

  // Esta função é chamada a cada digitação no formulário. Ela atualiza
  // o estado `formData` com o novo valor do campo em que o usuário está digitando.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Esta função é chamada quando o usuário clica em "Salvar".
  // Nela, a gente simula o envio dos dados para a API e,
  // se a resposta for de sucesso, atualizamos os dados principais (`userData`).
  const handleSave = () => {
    console.log("Dados a serem salvos:", formData);
    // Simulação de atualização bem-sucedida.
    setUserData(formData);
    setEditMode(false); // Volta para o modo de visualização.
    alert("Perfil atualizado com sucesso!"); // Exibe uma mensagem de sucesso.
    setTimeout(() => setMessage(""), 3000); // Limpa a mensagem após 3 segundos.
  };

  // Esta função é chamada quando o usuário clica em "Cancelar".
  // e sai do modo de edição, descartando as alterações.
  const handleCancel = () => {
    setFormData(userData);
    setEditMode(false);
    alert("edição cancelada.");
    setTimeout(() => setMessage(""), 3000);
  };

  // função fictícia para a troca de senha.
  const handleChangePassword = () => {
    alert("Funcionalidade de troca de senha ativada!");
  };

  return (
    <div className="perfil-container">
      {/* O container interno, que funciona como a "caixa" do perfil*/}
      <div className="perfil-form-container">
        <img
          src={defaultUserImage}
          alt="Imagem de Perfil"
          className="perfil-img"
        />
        <h2>
          {userData.nome} {userData.sobrenome}
        </h2>
        {/* Exibe a mensagem de feedback se houver uma. */}
        {message && <p className="status-message">{message}</p>}

        {/* Renderização condicional: se `editMode` for `false`,
            mostra os dados; se for `true`, mostra o formulário. */}
        {!editMode ? (
          <div className="perfil-dados">
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>CPF:</strong> {userData.cpf}
            </p>
            <p>
              <strong>Gênero:</strong> {userData.genero || "não informado"}
            </p>
            <p>
              <strong>Data de Nascimento:</strong>{" "}
              {userData.dataNascimento || "não informada"}
            </p>
            <p>
              <strong>Telefone:</strong> {userData.telefone || "não informado"}
            </p>
            <p>
              <strong>Profissão:</strong>{" "}
              {userData.profissao || "não informada"}
            </p>
            <p>
              <strong>Estado Civil:</strong>{" "}
              {userData.estadoCivil || "não informado"}
            </p>
            {/* O botão para alternar para o modo de edição. */}
            <button onClick={() => setEditMode(true)}>Editar Dados</button>
            {/* O botão "Trocar Senha"*/}
            <button onClick={handleChangePassword}>Trocar Senha</button>
          </div>
        ) : (
          <form>
            {/* Campos do formulário para edição*/}
            <input
              type="text"
              placeholder="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Sobrenome"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="CPF"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <select
              name="genero"
              value={formData.genero}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Selecione o Gênero
              </option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outros">Outros</option>
            </select>
            <input
              type="date"
              placeholder="Data de Nascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              placeholder="Telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Profissão"
              name="profissao"
              value={formData.profissao}
              onChange={handleInputChange}
            />
            <select
              name="estadoCivil"
              value={formData.estadoCivil}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Selecione o Estado Civil
              </option>
              <option value="Solteiro">Solteiro(a)</option>
              <option value="Casado">Casado(a)</option>
              <option value="Divorciado">Divorciado(a)</option>
              <option value="Viúvo">Viúvo(a)</option>
            </select>
            {/* Botões de ação do formulário. */}
            <div className="form-actions">
              <button type="button" onClick={handleSave}>
                Salvar
              </button>
              <button type="button" onClick={handleCancel} className="cancel">
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
