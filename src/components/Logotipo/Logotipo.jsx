import logo1 from "../../img/logo.png";
import logo2 from "../../img/logo2.png";
import styles from "./logotipo.module.css";

export default function Logotipo({ variant = "primary" }) {
  const logoSrc = variant === "secondary" ? logo2 : logo1;

  return <img className={styles.logo} src={logoSrc} alt="Logo da MindCare" />;
}
