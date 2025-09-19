import styles from "./botao.module.css";

export default function Botao({ children, ...rest }) {
  return (
    <button className={styles.botao} {...rest}>
      {children}
    </button>
  );
}
