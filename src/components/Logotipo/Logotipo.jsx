import logoMindCare from "../../img/logo.png";
import styles from "./logotipo.module.css";

export default function Logotipo() {
  return (
    <img className={styles.logo} src={logoMindCare} alt="Logo da MindCare" />
  );
}
