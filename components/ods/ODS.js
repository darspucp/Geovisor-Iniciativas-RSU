import styles from "./ODS.module.scss";
import cn from "classnames";

export default function ODS({ ods, idOds }) {
  return (
    <div
      className={cn(
        `color_ods_${idOds}`,
        styles.contenedor_ods,
        "flex-center-center"
      )}
    >
      <p className={styles.titulo_ods}>{ods.label}</p>
      <p className={styles.numero_ods}>{idOds}</p>
    </div>
  );
}
