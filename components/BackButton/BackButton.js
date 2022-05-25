import React from "react";
import Image from "next/image";

import styles from "./BackButton.module.scss";
import iconoBack from "../../public/images/base_map/sidebar_iniciativas/icono_back.png";

class BackButton extends React.Component {
  render() {
    return (
      <div className={styles.boton_back}>
        <Image
          src={iconoBack}
          width={60}
          height={60}
          layout="responsive"
          objectFit="contain"
          onClick={this.props.onClickBack}
          alt="icono-back"
        ></Image>
      </div>
    );
  }
}

export default BackButton;
