import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import "./variables.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import CadastroPage from "./pages/Cadastro/CadastroPage";
import HomePage from "./pages/Home/HomePage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import BuscarTerapeutasPage from "./pages/BuscarTerapeutasPage/BuscarTerapeutasPage";
import PerfilPage from "./pages/PerfilPage/PerfilPage";
import UsuarioProvider from "./provider/UsuarioProvider";

export default function App() {
  return (
    <UsuarioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/buscarTerapeutas" element={<BuscarTerapeutasPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
        </Routes>
      </BrowserRouter>
    </UsuarioProvider>
  );
}
