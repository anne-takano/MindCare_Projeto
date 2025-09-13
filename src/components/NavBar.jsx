export default function NavBar({ actionNavigate }) {
  return (
    <>
      <nav>
        <a onClick={() => actionNavigate(2)}>Dashboard</a>
        <a onClick={() => actionNavigate(3)}>Perfil</a>
      </nav>
    </>
  );
}
