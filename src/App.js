import { useState } from "react";
import "./styles.css";
import "./variables.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import CadastroPage from "./pages/Cadastro/CadastroPage";
import HomePage from "./pages/Home/HomePage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import PerfilPage from "./pages/PerfilPage";
import NavBar from "./components/NavBar/NavBar";

export default function App() {
  //a página começa sempre no Login. (IMPORTANTE!)
  const [page, setPage] = useState("LoginPage");
  const [user, setUser] = useState("");

  //função para trocar de página
  function goToPage(page) {
    setPage(page);
  }

  //função para setar o usuário após validação do login
  function updateUser(user) {
    setUser(user);
  }

  //função que decide qual página mostrar
  function renderPage() {
    switch (page) {
      case "LoginPage":
        //Página Login pode ir pro Cadastro ou Dashboard
        return <LoginPage goToPage={goToPage} updateUser={updateUser} />;

      case "CadastroPage":
        //Página Cadastro, ao final, volta pro login
        return <CadastroPage goToPage={goToPage} />;

      case "HomePage":
        //Página HomePage aparece com o componente NavBar
        return (
          <>
            <NavBar goToPage={goToPage} />
            <HomePage goToPage={goToPage} user={user} />
          </>
        );

      case "DashboardPage":
        //Página Dashboard aparece com o componente NavBar
        return (
          <>
            <NavBar goToPage={goToPage} />
            <DashboardPage goToPage={goToPage} user={user} />
          </>
        );

      case "PerfilPage":
        //Página Perfil aparece com o componente NavBar
        return (
          <>
            <NavBar goToPage={goToPage} />
            <PerfilPage goToPage={goToPage} />
          </>
        );
      default:
        return <LoginPage goToPage={goToPage} />;
    }
  }

  return (
    <div className="App">
      {renderPage()}
      <footer>Mindcare 2025</footer>
    </div>
  );
}