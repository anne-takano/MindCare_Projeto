import { useState } from "react";
import { Link } from "react-router-dom";
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
      <Link to="/home" style={{ textDecoration: "none" }}>
        <div className={style.logo} style={{ cursor: "pointer" }}>
          <Logotipo variant="secondary" />
        </div>
      </Link>

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
          <Link to="/home" className={style.navLink}>
            Home
          </Link>
        </li>
        <li className={style.navItem}>
          <Link to="/dashboard" className={style.navLink}>
            Dashboard
          </Link>
        </li>
        <li className={style.navItem}>
          <Link to="/perfil" className={style.navLink}>
            Perfil
          </Link>
        </li>
        <li className={style.navItem}>
          <Link to="/" className={style.navLink}>
            Sair
          </Link>
        </li>
      </ul>
    </nav>
  );
}
