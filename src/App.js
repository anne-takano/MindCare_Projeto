import { useState } from "react";
import "./styles.css";
import LoginPage from "./pages/LoginPage";
import CadastroPage from "./pages/CadastroPage";
import DashboardPage from "./pages/DashboardPage";
import PerfilPage from "./pages/PerfilPage";
import NavBar from "./components/NavBar";

export default function App() {
  const [page, setPage] = useState(0);

  function alterPage(page) {
    setPage(page);
  }

  const pages = [
    <LoginPage actionNavigate={alterPage} />,
    <CadastroPage actionNavigate={alterPage} />,
    <DashboardPage />,
    <PerfilPage />,
  ];

  return (
    <div className="App">
      {page > 1 && <NavBar actionNavigate={alterPage} />}
      {pages[page]}
      <footer>Mindcare 2025</footer>
    </div>
  );
}
