import React from "react";
import Image from "next/image";

import cn from "classnames";

import styles from "./BotonAmbito.module.scss";

class BotonAmbito extends React.Component {
  render() {
    return (
      <div
        className={cn(styles.botonAmbito, "flex-start-center")}
        onClick={this.props.onClick}
      >
        { this.props.icon && (
          <div className={styles.icono_boton_ambito}>
            <Image
              src="/images/base_map/sidebar_iniciativas/icono_ambito.png"
              width={28}
              height={30}
              layout="responsive"
              objectFit="contain"
              alt="icono-ambito"
            ></Image>
          </div>
        )}
        <h2 className={cn("titulo_boton_ambito")}>{this.props.titulo_boton}</h2>
      </div>
    );
  }
}

export default BotonAmbito;
