import React from "react";
import Image from "next/image";

import cn from "classnames";

import styles from "./header.module.scss";
import logoDars from "../../public/images/header/logo_dars.png";
import Link from "next/link";

import { Icon } from '@iconify/react';
import { Drawer, List, Box, ListItem, ListItemIcon, Divider } from '@mui/material';

class Header extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      drawerOpen: false,
    };
  }

  handleDrawerClose = () => {
    this.setState((state) => ({
      drawerOpen: false,
    }));
  }

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
        </div>

        <div
          className={styles.button_menu}
          onClick={() => {
            this.setState((state) => ({
              drawerOpen: true,
            }));
          }}
        >
          <Image
            src="/images/base_map/menu_icon.png"
            width={20}
            height={20}
            layout="responsive"
            objectFit="cover"
            alt="menu-icon"
          ></Image>
        </div>

        <Drawer
          open={this.state.drawerOpen}
          onClose={this.handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          PaperProps={{ sx: { pb: 5, width: 270 } }}
          anchor={'right'}
        >
          <List disablePadding>
            <ListItem button divider>
              <ListItemIcon><Box component={Icon} icon={"mdi:account-group"} sx={{ width: 22, height: 22 }} /></ListItemIcon>
              <Link href="https://dars.pucp.edu.pe/ ">
                <a target="_blank" className="texto_menu_mobile">
                  Nosotros
                </a>
              </Link>
            </ListItem>
            <Divider />
            <ListItem button divider>
              <ListItemIcon><Box component={Icon} icon={"mdi:tools"} sx={{ width: 22, height: 22 }} /></ListItemIcon>
              <Link href="https://sites.google.com/pucp.pe/proyectocajadeherramientasrsu/herramientas/herramientas-para-docentes?authuser=0">
                <a target="_blank" className="texto_menu_mobile">
                  Caja de herramientas
                </a>
              </Link>
            </ListItem>
            <Divider />
          </List>
        </Drawer>


      </div>
    );
  }
}

export default Header;
