import styles from "./campo-input.module.css";

export default function CampoInput(props) {
  return <input {...props} className={styles.campoEntradaForm} required />;
}
