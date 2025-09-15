import { useState } from "react";
import "./styles.css";
import "./variables.css";
import LoginPage from "./pages/LoginPage";
import CadastroPage from "./pages/CadastroPage";
import DashboardPage from "./pages/DashboardPage";
import PerfilPage from "./pages/PerfilPage";

export default function App() {
  const [page, setPage] = useState("DashboardPage");

  function goToPage(page) {
    setPage(page);
  }

  function renderPage() {
    switch (page) {
      case "LoginPage":
        return <LoginPage goToPage={goToPage} />;
      case "CadastroPage":
        return <CadastroPage goToPage={goToPage} />;
      case "DashboardPage":
        return <DashboardPage goToPage={goToPage} />;
      case "PerfilPage":
        return <PerfilPage goToPage={goToPage} />;
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
