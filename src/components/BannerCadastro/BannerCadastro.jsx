import styles from "./banner-cadastro.module.css";

export default function BannerCadastro({ titulo, subtitulo, onClick, texto }) {
  return (
    <div className={styles.bannerContainer}>
      <h2 className={styles.bannerTitulo}>{titulo}</h2>
      <p className={styles.bannerSubtitulo}>
        {subtitulo} <a onClick={onClick}>{texto}</a>
      </p>
    </div>
  );
}
