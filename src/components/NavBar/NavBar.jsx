import { useState } from "react";
import Icon from "../Icon/Icon.jsx";
import style from "./navbar.module.css";
import Logotipo from "../Logotipo/Logotipo.jsx";

export default function NavBar({ goToPage }) {
  const [active, setActive] = useState(false);

  function handleClick() {
    setActive((prev) => !prev);
  }

  return (
    <nav className={style.navbar}>
      <h1 className={style.logo}>
        <Logotipo variant="secondary" />
      </h1>
      <div className={style.bar}>
        <button className={style.btn} onClick={handleClick}>
          <Icon
            iconName={active ? "close" : "menu"}
            color={active ? "black" : "white"}
          />
        </button>
        <ul className={`${style.list} ${active ? "" : style.hide}`}>
          <li className={style.item}>
            <a className={style.link} onClick={() => goToPage("HomePage")}>
              Home
            </a>
          </li>
          <li className={style.item}>
            <a className={style.link} onClick={() => goToPage("DashboardPage")}>
              Dashboard
            </a>
          </li>
          <li className={style.item}>
            <a className={style.link} onClick={() => goToPage("PerfilPage")}>
              Perfil
            </a>
          </li>
          <li className={style.item}>
            <a className={style.link} onClick={() => goToPage("LoginPage")}>
              Sair
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
