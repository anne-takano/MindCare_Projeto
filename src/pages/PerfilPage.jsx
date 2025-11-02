import { useState, useEffect } from "react";
import styles from "./perfil-page.estilos.module.css";
import "../styles.css";

export default function PerfilPage({ user }) {
    // Armazena os dados do perfil do usuário.
    const [userData, setUserData] = useState(null);
    // Armazena os dados do formulário durante a edição.
    const [formData, setFormData] = useState({});
    // Controla a exibição entre o modo de visualização e edição.
    const [editMode, setEditMode] = useState(false);
    // Exibe mensagens de feedback para o usuário.
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Busca dados do usuário do arquivo pacientes.json
        const fetchUserData = async () => {
            try {
                const response = await fetch(`users/pacientes/pacientes.json`);
                const data = await response.json();
                const paciente = Array.isArray(data)
                    ? data.find((p) => p.username === user)
                    : (data && data[user]) || null;
                
                if (paciente) {
                    const pacienteCompleto = {
                        ...paciente,
                        telefone: paciente.telefone || "",
                        profissao: paciente.profissao || "",
                        estadoCivil: paciente.estadoCivil || "",
                        rua: paciente.rua || "",
                        numero: paciente.numero || "",
                        cep: paciente.cep || "",
                        endereco: paciente.endereco || "",
                    };
                    setUserData(pacienteCompleto);
                    setFormData(pacienteCompleto);
                }
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        };
        
        if (user) {
            fetchUserData();
        }
    }, [user]);

    if (!userData) {
        return <div>Carregando perfil...</div>;
    }

    // Atualiza o estado do formulário a cada mudança nos inputs.
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Salva as alterações do perfil.
    const handleSave = () => {
        console.log("Dados a serem salvos:", formData);
        // TODO: Enviar dados para a API.
        setUserData(formData);
        setEditMode(false);
        alert("Perfil atualizado com sucesso!");
        setTimeout(() => setMessage(""), 3000);
    };

    // Cancela a edição e reverte as alterações.
    const handleCancel = () => {
        setFormData(userData);
        setEditMode(false);
        alert("Edição cancelada.");
        setTimeout(() => setMessage(""), 3000);
    };

    // Ação para troca de senha.
    const handleChangePassword = () => {
        alert("Funcionalidade de troca de senha ativada!");
    };

    return (
        <div className={styles['perfil-container']}>
            {/* O container interno, que funciona como a "caixa" do perfil*/}
            <div className={styles['perfil-form-container']}>
                <img
                    src={userData.img || "https://i.pravatar.cc/300"}
                    alt="Imagem de Perfil"
                    className={styles['perfil-img']}
                />
                <h2>
                    {userData.nome} {userData.sobrenome}
                </h2> 
                {message && <p>{message}</p>}

                {/* Alterna entre modo de visualização e edição */}
                {!editMode ? (
                    <div className={styles['perfil-dados']}>
                        <p>
                            <strong>Email:</strong> {userData.email}
                        </p>
                        <p>
                            <strong>CPF:</strong> {userData.cpf}
                        </p>
                        <p>
                            <strong>Gênero:</strong> {userData.genero || "Não informado"}
                        </p>
                        <p>
                            <strong>Data de Nascimento:</strong>{" "}
                            {userData.dataNascimento || "Não informada"}
                        </p>
                        <p>
                            <strong>Telefone:</strong> {userData.telefone || "Não informado"}
                        </p>
                        <p>
                            <strong>Profissão:</strong> {userData.profissao || "Não informada"}
                        </p>
                        <p>
                            <strong>Estado Civil:</strong>{" "}
                            {userData.estadoCivil || "Não informado"}
                        </p>
                        <p>
                            <strong>Endereço:</strong>{" "}
                            {userData.endereco || `${userData.rua || ""} ${userData.numero || ""}, ${userData.cidade || ""}, ${userData.estado || ""}`.trim() || "Não informado"}
                        </p>
                        <p>
                            <strong>CEP:</strong>{" "}
                            {userData.cep || "Não informado"}
                        </p>
                        <button className={styles.button} onClick={() => setEditMode(true)}>
                            Editar Dados
                        </button>
                        <button className={styles.button} onClick={handleChangePassword}>
                            Trocar Senha
                        </button>
                    </div>
                ) : (
                    <form>
                        {/* Campos do formulário para edição*/}
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                        />
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Sobrenome"
                            name="sobrenome"
                            value={formData.sobrenome}
                            onChange={handleInputChange}
                            />
                            <input
                                className={styles.input}
                                type="cpf"
                                placeholder="CPF"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleInputChange}
                            />
                        <input
                            className={styles.input}
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                            <select
                                className={styles.select}
                                name="genero"
                                value={formData.genero}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Selecione o Gênero</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outros">Outros</option>
                            </select>
                        <input
                            className={styles.input}
                            type="date"
                            placeholder="Data de Nascimento"
                            name="dataNascimento"
                            value={formData.dataNascimento}
                            onChange={handleInputChange}
                        />
                        <input
                            className={styles.input}
                            type="tel"
                            placeholder="Telefone"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleInputChange}
                        />
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Profissão"
                            name="profissao"
                            value={formData.profissao}
                            onChange={handleInputChange}
                        />
                            <select
                                className={styles.select}
                                name="estadoCivil"
                                value={formData.estadoCivil}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Selecione o Estado Civil</option>
                                <option value="Solteiro">Solteiro(a)</option>
                                <option value="Casado">Casado(a)</option>
                                <option value="Divorciado">Divorciado(a)</option>
                                <option value="Viúvo">Viúvo(a)</option>
                            </select>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Rua"
                            name="rua"
                            value={formData.rua || ""}
                            onChange={handleInputChange}
                        />
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Número"
                            name="numero"
                            value={formData.numero || ""}
                            onChange={handleInputChange}
                        />
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="CEP"
                            name="cep"
                            value={formData.cep || ""}
                            onChange={handleInputChange}
                        />
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Cidade"
                            name="cidade"
                            value={formData.cidade || ""}
                            onChange={handleInputChange}
                        />
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Estado"
                            name="estado"
                            value={formData.estado || ""}
                            onChange={handleInputChange}
                        />
                        {/* Botões de ação do formulário. */}
                        <div className={styles['form-actions']}>
                            <button type="button" className={`${styles.button} ${styles.actionButton}`} onClick={handleSave}>
                                Salvar
                            </button>
                            <button type="button" onClick={handleCancel} className={`${styles.button} ${styles.actionButton} ${styles.cancel}`}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
