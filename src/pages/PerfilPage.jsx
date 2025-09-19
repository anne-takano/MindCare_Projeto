import { useState, useEffect } from "react";
import "./perfil-page.estilos.css";
import "../styles.css";

// Para simular a imagem do usu�rio
const defaultUserImage = "https://i.pravatar.cc/300";

export default function PerfilPage() {
    // `null` no in�cio para indicar que os dados ainda n�o foram carregados.
    const [userData, setUserData] = useState(null);
    // Isso permite que o usu�rio edite os dados
    // sem alterar o estado original `userData` at� que o bot�o "Salvar" seja clicado.
    const [formData, setFormData] = useState({});
    // `editMode` controla a visualiza��o da p�gina. Se for `false`,
    // o usu�rio v� os dados do perfil; se for `true`, o formul�rio de edi��o aparece.
    const [editMode, setEditMode] = useState(false);
    // `message` � usado para exibir feedback ao usu�rio, como "Perfil atualizado!"
    // ou "Edi��o cancelada.".
    const [message, setMessage] = useState("");
    useEffect(() => {
        // Esta fun��o simula a busca dos dados do usu�rio logado.
        // em um proximo passo faremos uma chamada a uma API (ex: `fetch('/api/user/profile')`).
        const fetchUserData = () => {
            // Dados din�micos que viriam de uma fonte externa como json ou BD.
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

    // Esta fun��o � chamada a cada digita��o no formul�rio. Ela atualiza
    // o estado `formData` com o novo valor do campo em que o usu�rio est� digitando.
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Esta fun��o � chamada quando o usu�rio clica em "Salvar".
    // Nela, a gente simula o envio dos dados para a API e,
    // se a resposta for de sucesso, atualizamos os dados principais (`userData`).
    const handleSave = () => {
        console.log("Dados a serem salvos:", formData);
        // Simula��o de atualiza��o bem-sucedida.
        setUserData(formData);
        setEditMode(false); // Volta para o modo de visualiza��o.
        alert("Perfil atualizado com sucesso!"); // Exibe uma mensagem de sucesso.
        setTimeout(() => setMessage(""), 3000); // Limpa a mensagem ap�s 3 segundos.
    };

    // Esta fun��o � chamada quando o usu�rio clica em "Cancelar".
    // e sai do modo de edi��o, descartando as altera��es.
    const handleCancel = () => {
        setFormData(userData);
        setEditMode(false);
        alert("Edi��o cancelada.");
        setTimeout(() => setMessage(""), 3000);
    };

    // Fun��o fict�cia para a troca de senha.
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

                {/* Renderiza��o condicional: se `editMode` for `false`,
            mostra os dados; se for `true`, mostra o formul�rio. */}
                {!editMode ? (
                    <div className="perfil-dados">
                        <p>
                            <strong>Email:</strong> {userData.email}
                        </p>
                        <p>
                            <strong>CPF:</strong> {userData.cpf}
                        </p>
                        <p>
                            <strong>G�nero:</strong> {userData.genero || "N�o informado"}
                        </p>
                        <p>
                            <strong>Data de Nascimento:</strong>{" "}
                            {userData.dataNascimento || "N�o informada"}
                        </p>
                        <p>
                            <strong>Telefone:</strong> {userData.telefone || "N�o informado"}
                        </p>
                        <p>
                            <strong>Profiss�o:</strong> {userData.profissao || "N�o informada"}
                        </p>
                        <p>
                            <strong>Estado Civil:</strong>{" "}
                            {userData.estadoCivil || "N�o informado"}
                        </p>
                        {/* O bot�o para alternar para o modo de edi��o. */}
                        <button onClick={() => setEditMode(true)}>
                            Editar Dados
                        </button>
                        {/* O bot�o "Trocar Senha"*/}
                        <button onClick={handleChangePassword}>
                            Trocar Senha
                        </button>
                    </div>
                ) : (
                    <form>
                        {/* Campos do formul�rio para edi��o*/}
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
                                type="cpf"
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
                                <option value="" disabled>Selecione o G�nero</option>
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
                            placeholder="Profiss�o"
                            name="profissao"
                            value={formData.profissao}
                            onChange={handleInputChange}
                        />
                            <select
                                name="estadoCivil"
                                value={formData.estadoCivil}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Selecione o Estado Civil</option>
                                <option value="Solteiro">Solteiro(a)</option>
                                <option value="Casado">Casado(a)</option>
                                <option value="Divorciado">Divorciado(a)</option>
                                <option value="Vi�vo">Vi�vo(a)</option>
                            </select>
                        {/* Bot�es de a��o do formul�rio. */}
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
