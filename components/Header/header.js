import React from "react";
import Image from "next/image";

import cn from "classnames";

import styles from "./header.module.scss";
import logoDars from "../../public/images/header/logo_dars.png";
import Link from "next/link";

class Header extends React.Component {
  render() {
    return (
      <div
        className={cn(styles.navbar, "padding-lateral", "flex-between-center")}
      >
        <Link href="/">
          <a className={styles.logo_dars}>
            <Image
              src={logoDars}
              height={126}
              width={328}
              layout="responsive"
              objectFit="contain"
              alt="logo-dars"
            ></Image>
          </a>
        </Link>

        <div className={cn("flex-center-center", styles.menus_container)}>
          <Link href="https://dars.pucp.edu.pe/ ">
            <a target="_blank" className={cn(styles.menu, "texto_menu")}>
              Nosotros
            </a>
          </Link>
          <Link href="https://sites.google.com/pucp.pe/proyectocajadeherramientasrsu/herramientas/herramientas-para-docentes?authuser=0">
            <a target="_blank" className={cn(styles.menu, "texto_menu")}>
              Caja de herramientas
            </a>
          </Link>
          {/* <Link href="/territorio">
            <a className={cn(styles.menu, "texto_menu")}>Territorio</a>
          </Link> */}
        </div>
      </div>
    );
  }
}

export default Header;
