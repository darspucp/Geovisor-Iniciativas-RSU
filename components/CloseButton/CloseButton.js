import React from "react";
import Image from "next/image";

import styles from "./CloseButton.module.scss";
import iconoCerrar from "../../public/images/base_map/sidebar_iniciativas/icono_cerrar_rojo.png";

class CloseButton extends React.Component {
  render() {
    return (
      <div className={styles.boton_cerrar}>
        <Image
          src={iconoCerrar}
          width={85}
          height={85}
          layout="responsive"
          objectFit="contain"
          onClick={this.props.onClickCerrar}
          alt="icono-cerrar"
        ></Image>
      </div>
    );
  }
}

export default CloseButton;
