import style from "./fotoDePerfil.module.css";

export default function FotoDePerfil({ img }) {
  return (
    <>
      <div className={style.container}>
        <img src={img} alt="Imagem de Perfil" className={style.imgPerfil} />
      </div>
    </>
  );
}
