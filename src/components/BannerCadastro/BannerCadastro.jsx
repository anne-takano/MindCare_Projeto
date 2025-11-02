import { Link } from "react-router-dom";
import styles from "./banner-cadastro.module.css";

export default function BannerCadastro({ titulo, subtitulo, link, texto }) {
  return (
    <div className={styles.bannerContainer}>
      <h2 className={styles.bannerTitulo}>{titulo}</h2>
      <p className={styles.bannerSubtitulo}>
        {subtitulo} <Link to={link}>{texto}</Link>
      </p>
    </div>
  );
}
