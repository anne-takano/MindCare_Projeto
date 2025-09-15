import NavBar from "../components/NavBar/NavBar";

export default function DashboardPage({ goToPage }) {
  return (
    <>
      <NavBar goToPage={goToPage} />
      <h2>Dashboard</h2>
    </>
  );
}
