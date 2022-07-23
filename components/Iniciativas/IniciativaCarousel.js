import React from "react";
import Link from "next/link";

import cn from "classnames";
import styles from "./IniciativaCarousel.module.scss";

export default function IniciativaCarousel({ postIniciativa }) {
  //console.log(postIniciativa)
  return (
    <div
      className={cn(
        styles.contenedor_iniciativa_carousel,
        "flex-column-center-center"
      )}
    >
      <h1 className={cn(styles.titulo)}>{postIniciativa?.acf?.titulo}</h1>
      <p className={cn(styles.ubicacion)}>{postIniciativa?.acf?.especialidad}</p>
      <div className={cn(styles.contenedor_botones, "flex-between-center")}>
        <Link href={`/iniciativas/descripcion/iniciativa/${postIniciativa.id}`}>
          <a
            className={cn(
              styles.boton_carousel_iniciativa,
              styles.boton_descripcion
            )}
            target="_blank"
          >
            Ver iniciativa
          </a>
        </Link>
      </div>
    </div>
  );
}
