import styles from "./banner-cadastro.module.css";

export default function BannerCadastro() {
  return (
    <div className={styles.bannerContainer}>
      <h2 className={styles.bannerTitulo}>Seja bem vindo(a)!</h2>
      <p className={styles.bannerSubtitulo}>
        Insira seus dados para realizar o cadastro:
      </p>
    </div>
  );
}
