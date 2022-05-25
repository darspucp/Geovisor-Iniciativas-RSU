import Image from "next/image";
import axios from "axios";
import cn from "classnames";
import { INICIATIVAS_API_URL } from "../../../../lib/constants";
import { Row, Col } from "react-bootstrap";

import styles from "./IndicadorIniciativa.module.scss";

export default function PostIndicador({ post }) {
  return (
    <div className={styles.post_indicador}>
      <div className={cn(styles.header)}>
        <h1 className={styles.titulo}>{post.acf.titulo}</h1>
      </div>
      <div className={cn(styles.contenedor_datos)}>
        <h2 className={cn(styles.subtitulo_seccion)}>Indicadores</h2>

        <Row className="flex-center-center">
          <Col
            lg={5}
            className={cn(
              styles.columna_indicador,
              "flex-column-center-center"
            )}
          >
            <div className={cn(styles.icono_datos)}>
              <Image
                src="/images/iniciativas/indicadores/icono_mapa.png"
                width={100}
                height={100}
                objectFit="contain"
                layout="responsive"
                alt="icono-mapa"
              ></Image>
            </div>
            <p className={cn("texto_descripcion_iniciativa")}>
              {post.acf.indicadores.porcentaje_territorio_nacional}% del
              territorio nacional
            </p>
          </Col>
          <Col
            lg={5}
            className={cn(
              styles.columna_indicador,
              "flex-column-center-center"
            )}
          >
            <div className={cn(styles.icono_datos)}>
              <Image
                src="/images/iniciativas/indicadores/icono_poblacion.png"
                width={100}
                height={100}
                objectFit="contain"
                layout="responsive"
                alt="icono-poblacion"
              ></Image>
            </div>
            <p className={cn("texto_descripcion_iniciativa")}>
              {post.acf.indicadores.porcentaje_poblacion_nacional}% de la
              población nacional
            </p>
          </Col>
          <Col
            lg={5}
            className={cn(
              styles.columna_indicador,
              "flex-column-center-center"
            )}
          >
            <div className={cn(styles.icono_datos)}>
              <Image
                src="/images/iniciativas/indicadores/icono_balanza.png"
                width={100}
                height={100}
                objectFit="contain"
                layout="responsive"
                alt="icono-balanza"
              ></Image>
            </div>
            <p className={cn("texto_descripcion_iniciativa")}>
              {post.acf.indicadores.porcentaje_habitantes_pobres}% de habitantes
              son pobres *
            </p>
          </Col>
          <Col
            lg={5}
            className={cn(
              styles.columna_indicador,
              "flex-column-center-center"
            )}
          >
            <div className={cn(styles.icono_datos)}>
              <Image
                src="/images/iniciativas/indicadores/icono_servicios.png"
                width={100}
                height={100}
                objectFit="contain"
                layout="responsive"
                alt="icono-no-servicios"
              ></Image>
            </div>
            <p className={cn("texto_descripcion_iniciativa")}>
              {post.acf.indicadores.porcentaje_habitantes_sin_servicios}% de
              habitantes no tienen todos los servicios básicos**
            </p>
          </Col>
          <Col
            lg={5}
            className={cn(
              styles.columna_indicador,
              "flex-column-center-center"
            )}
          >
            <div className={cn(styles.icono_datos)}>
              <Image
                src="/images/iniciativas/indicadores/icono_numero_iniciativas.png"
                width={100}
                height={100}
                objectFit="contain"
                layout="responsive"
                alt="icono-iniciativas"
              ></Image>
            </div>
            <p className={cn("texto_descripcion_iniciativa")}>
              {post.acf.indicadores.numero_iniciativas_rsu}iniciativas RSU
            </p>
          </Col>
        </Row>

        <div className={cn(styles.contenedor_pie_pagina)}>
          <p className={cn("texto_pie_pagina_indicador")}>
            *Promedio de la Pobreza monetaria a nivel distrital del 2018
          </p>
          <p className={cn("texto_pie_pagina_indicador")}>
            **Necesidades básicas insatisfechas (NBI)
          </p>
          <p className={cn("texto_pie_pagina_indicador")}>
            Fuente: Instituto Nacional de Estadística e Informática (INEI).{" "}
          </p>
          <p className={cn("texto_pie_pagina_indicador")}>
            Censos Nacionales 2017: XII de Población, VII de Vivienda y III de
            Comunidades Indígenas & Mapa de Pobreza monetaria distrital del 2018
          </p>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await axios.get(INICIATIVAS_API_URL);
  const posts = res.data;

  const paths = posts.map((post) => ({
    params: {
      id: post.id.toString(),
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await axios.get(`${INICIATIVAS_API_URL}/${params.id}`);
  const post = res.data;

  return {
    props: { post: post },
  };
}
