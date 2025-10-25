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
      <div className={style.logo}>
        <Logotipo variant="secondary" />
      </div>

      <button className={style.menuBtn} onClick={handleClick}>
        <Icon
          iconName={active ? "close" : "menu"}
          color={active ? "black" : "white"}
          fontSize="40px"
          variant="rounded"
          weight={600}
        />
      </button>

      <ul className={`${style.navList} ${active ? style.active : ""}`}>
        <li className={style.navItem}>
          <a className={style.navLink} onClick={() => goToPage("HomePage")}>
            Home
          </a>
        </li>
        <li className={style.navItem}>
          <a
            className={style.navLink}
            onClick={() => goToPage("DashboardPage")}
          >
            Dashboard
          </a>
        </li>
        <li className={style.navItem}>
          <a className={style.navLink} onClick={() => goToPage("PerfilPage")}>
            Perfil
          </a>
        </li>
        <li className={style.navItem}>
          <a className={style.navLink} onClick={() => goToPage("LoginPage")}>
            Sair
          </a>
        </li>
      </ul>
    </nav>
  );
}
