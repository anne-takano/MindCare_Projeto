import styles from "./buscar-terapeutas-page.module.css";
import NavBar from "../../components/NavBar/NavBar";

export default function BuscarTerapeutasPage() {
  return (
    <>
      <NavBar />
      <div className={styles.pageContainer}>
        <h2 className={styles.title}>Buscar terapeutas</h2>
        <p className={styles.subtitle}>
          Em breve: filtros e lista de profissionais.
        </p>
      </div>
    </>
  );
}
