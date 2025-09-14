export default function NavBar({ goToPage }) {
  return (
    <>
      <nav>
        <a onClick={() => goToPage("DashboardPage")}>Dashboard</a>
        <a onClick={() => goToPage("PerfilPage")}>Perfil</a>
      </nav>
    </>
  );
}
