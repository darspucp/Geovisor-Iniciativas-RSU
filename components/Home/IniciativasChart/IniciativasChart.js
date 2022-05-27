import React from "react";
import Image from "next/image";

import cn from "classnames";

import styles from "./IniciativasChart.module.scss";

class IniciativasChart extends React.Component {
  datos = [
    { numero: "3 ", descripcion: "Nacionales" },
    { numero: "86 ", descripcion: "Lima Metropolitana y Callao" },
    { numero: "36 ", descripcion: "Costa" },
    { numero: "43 ", descripcion: "Los Andes" },
    { numero: "21 ", descripcion: "Amazonía" },
  ];

  generarDatos = () => {
    var datosContenido = this.datos.map((dato, index) => {
      return (
        <div
          className={cn(styles.fila_dato, "flex-start-center")}
          key={dato.numero + index}
        >
          <h3 className={cn(styles.numero_dato, "texto_color_principal")}>
            {`${dato.numero}`}
          </h3>
          <p className={cn(styles.descripcion, "texto_detalle")}>
            {`  ${dato.descripcion}`}
          </p>
        </div>
      );
    });

    return datosContenido;
  };

  render() {
    return (
      <div style={{ position: "relative" }}>
        <div className={cn(styles.contenedor_datos)}>{this.generarDatos()}</div>
        <div className={styles.contenedor_pin}>
          <Image
            src="/images/home/pin.png"
            width={70}
            height={86}
            layout="responsive"
            objectFit="contain"
            alt="pin"
          ></Image>
        </div>
      </div>
    );
  }
}

export default IniciativasChart;
