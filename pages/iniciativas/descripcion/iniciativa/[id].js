import Image from "next/image";
import axios from "axios";
import cn from "classnames";
import { INICIATIVAS_API_URL } from "../../../../lib/constants";
import ODS from "../../../../components/ods/ODS";
import { Row, Col } from "react-bootstrap";
import { getNumPosts, fetchPosts } from "../../../../lib/utils";

import styles from "./DescripcionIniciativa.module.scss";

const getAllPosts = async () => {
  const numberPages = await getNumPosts();
  const totalPosts = await fetchPosts(numberPages);
  return totalPosts;
};

export default function PostDescripcion({ post }) {
  return (
    <div className={styles.post_descripcion}>
      <div className={cn(styles.header)}>
        <h1 className={styles.titulo}>{post.acf.titulo}</h1>
      </div>
      <div className={cn(styles.contenedor_datos)}>
        <div
          className={cn(styles.seccion, styles.seccion_descripcion_ubicacion)}
        >
          <Row>
            <h2 className={cn(styles.subtitulo_seccion)}>Descripción</h2>
            {post.acf.descripcion && (
              <Col lg={12}>
                <div
                  className={cn("texto_descripcion_iniciativa")}
                  dangerouslySetInnerHTML={{
                    __html: post.acf.descripcion,
                  }}
                ></div>
              </Col>
            )}
            {/* {post.acf.ubicacion_detalle && (
              <Col lg={6}>
                <h2 className={cn(styles.subtitulo_seccion)}>Ubicación</h2>
                <div
                  className={cn("texto_descripcion_iniciativa")}
                  dangerouslySetInnerHTML={{
                    __html: post.acf.ubicacion_detalle,
                  }}
                ></div>
              </Col>
            )} */}
          </Row>
        </div>
        <div
          className={cn(
            styles.seccion,
            styles.seccion_datos_socio_territoriales
          )}
        >
          <Row>
            <Col lg={6}>
              <h2 className={cn(styles.subtitulo_seccion)}>
                Datos socio-territoriales
              </h2>
              <div className={styles.contenedor_no_texto}>
                <Row
                  className={cn(
                    "flex-center-center",
                    styles.fila_socio_territorial
                  )}
                >
                  <Col lg={4} className="flex-center-center">
                    <div className={cn(styles.icono_datos)}>
                      <Image
                        src="/images/iniciativas/descripcion/icono_ubicacion.png"
                        width={100}
                        height={100}
                        objectFit="contain"
                        layout="responsive"
                        alt="icono-ubicacion"
                      ></Image>
                    </div>
                  </Col>
                  <Col lg={8}>
                    <div
                      className={cn("texto_descripcion_iniciativa")}
                      dangerouslySetInnerHTML={{
                        __html: post.acf.ubicacion_detalle,
                      }}
                    ></div>
                  </Col>
                </Row>
                <Row
                  className={cn(
                    "flex-center-center",
                    styles.fila_socio_territorial
                  )}
                >
                  <Col lg={4} className="flex-center-center">
                    <div className={cn(styles.icono_datos)}>
                      <Image
                        src="/images/iniciativas/descripcion/icono_poblacion.png"
                        width={100}
                        height={100}
                        objectFit="contain"
                        layout="responsive"
                        alt="icono-poblacion"
                      ></Image>
                    </div>
                  </Col>
                  <Col lg={8}>
                    <p className={cn("texto_descripcion_iniciativa")}>
                      <strong className={"texto_descripcion_iniciativa_strong"}>
                        Población censada :
                      </strong>
                      {post.acf.datos_complementarios.poblacion}
                    </p>

                    <p className={cn("texto_descripcion_iniciativa")}>
                      <strong className={"texto_descripcion_iniciativa_strong"}>
                        Hombres :
                      </strong>
                      {post.acf.datos_complementarios.hombres}
                    </p>
                    <p className={cn("texto_descripcion_iniciativa")}>
                      <strong className={"texto_descripcion_iniciativa_strong"}>
                        Mujeres :
                      </strong>
                      {post.acf.datos_complementarios.mujeres}
                    </p>
                  </Col>
                </Row>
                <Row
                  className={cn(
                    "flex-center-center",
                    styles.fila_socio_territorial
                  )}
                >
                  <Col lg={4} className="flex-center-center">
                    <div className={cn(styles.icono_datos)}>
                      <Image
                        src="/images/iniciativas/descripcion/icono_agua.png"
                        width={100}
                        height={100}
                        objectFit="contain"
                        layout="responsive"
                        alt="icono-agua"
                      ></Image>
                    </div>
                  </Col>
                  <Col lg={8}>
                    <p className={cn("texto_descripcion_iniciativa")}>
                      <strong className={"texto_descripcion_iniciativa_strong"}>
                        Viviendas inadecuadas :
                      </strong>
                      {post.acf.datos_complementarios.viviendas_inadecuadas}% de
                      habitantes
                    </p>
                    <p className={cn("texto_descripcion_iniciativa")}>
                      <strong className={"texto_descripcion_iniciativa_strong"}>
                        Hacinamiento :
                      </strong>
                      {post.acf.datos_complementarios.hacinamiento}% de
                      habitantes
                    </p>
                    <p className={cn("texto_descripcion_iniciativa")}>
                      <strong className={"texto_descripcion_iniciativa_strong"}>
                        Sin servicios higiénicos :
                      </strong>
                      {post.acf.datos_complementarios.servicios_higienicos}% de
                      habitantes
                    </p>
                  </Col>
                </Row>
                <Row
                  className={cn(
                    "flex-center-center",
                    styles.fila_socio_territorial
                  )}
                >
                  <Col lg={4} className="flex-center-center">
                    <div className={cn(styles.icono_datos)}>
                      <Image
                        src="/images/iniciativas/descripcion/icono_crecimiento.png"
                        width={100}
                        height={100}
                        objectFit="contain"
                        layout="responsive"
                        alt="icono-crecimiento"
                      ></Image>
                    </div>
                  </Col>
                  <Col lg={8}>
                    <p className={cn("texto_descripcion_iniciativa")}>
                      <strong className={"texto_descripcion_iniciativa_strong"}>
                        Ausentismo escolar :
                      </strong>
                      {post.acf.datos_complementarios.asistencia_escolar}% de
                      habitantes
                    </p>
                    <p className={cn("texto_descripcion_iniciativa")}>
                      <strong className={"texto_descripcion_iniciativa_strong"}>
                        Dependencia económica :
                      </strong>
                      {post.acf.datos_complementarios.dependencia_economica}% de
                      habitantes
                    </p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={6}>
              <h2 className={cn(styles.subtitulo_seccion)}>
                Objetivos de Desarrollo Sostenible
              </h2>
              <Row
                className={cn(styles.contenedor_no_texto, "flex-center-center")}
              >
                {post.acf.ODS.objetivos.map((ods, index) => {
                  return (
                    <Col
                      key={ods.label}
                      md={6}
                      lg={4}
                      className={cn(
                        "objetivos",
                        "flex-center-center"
                      )}
                    >
                      <div className={cn(styles.icono_datos_indicador, "objetivos")}>
                        <Image
                            src={`/images/ods/${ods.value}.png`}
                            width={100}
                            height={100}
                            objectFit="contain"
                            layout="responsive"
                            alt="icono-mapa"
                          ></Image>
                        </div>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </div>
        <div className={cn(styles.seccion, styles.seccion_indicadores)}>
          <h2 className={cn(styles.subtitulo_seccion)}>
            Indicadores regionales
          </h2>
          <Row className={cn("flex-center-center", styles.contenedor_no_texto)}>
            <Col
              lg={4}
              className={cn("flex-center-center", styles.contenedor_indicador)}
            >
              <div className={cn(styles.icono_datos_indicador)}>
                <Image
                  src="/images/iniciativas/descripcion/icono_mapa.png"
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
              lg={4}
              className={cn("flex-center-center", styles.contenedor_indicador)}
            >
              <div className={cn(styles.icono_datos_indicador)}>
                <Image
                  src="/images/iniciativas/descripcion/icono_poblacion_azul.png"
                  width={100}
                  height={100}
                  objectFit="contain"
                  layout="responsive"
                  alt="icono-poblacion-azul"
                ></Image>
              </div>
              <p className={cn("texto_descripcion_iniciativa")}>
                {post.acf.indicadores.porcentaje_poblacion_nacional}% de la
                población nacional
              </p>
            </Col>
            <Col
              lg={4}
              className={cn("flex-center-center", styles.contenedor_indicador)}
            >
              <div className={cn(styles.icono_datos_indicador)}>
                <Image
                  src="/images/iniciativas/descripcion/icono_balance.png"
                  width={100}
                  height={100}
                  objectFit="contain"
                  layout="responsive"
                  alt="icono-balance"
                ></Image>
              </div>
              <p className={cn("texto_descripcion_iniciativa")}>
                {post.acf.indicadores.porcentaje_habitantes_pobres}% de
                habitantes son pobres *
              </p>
            </Col>
            <Col
              lg={4}
              className={cn("flex-center-center", styles.contenedor_indicador)}
            >
              <div className={cn(styles.icono_datos_indicador)}>
                <Image
                  src="/images/iniciativas/descripcion/icono_servicios.png"
                  width={160}
                  height={160}
                  objectFit="contain"
                  layout="responsive"
                  alt="icono-servicios"
                ></Image>
              </div>
              <p className={cn("texto_descripcion_iniciativa")}>
                {post.acf.indicadores.porcentaje_habitantes_sin_servicios}% de
                habitantes no tienen todos los servicios básicos**
              </p>
            </Col>
            <Col
              lg={4}
              className={cn("flex-center-center", styles.contenedor_indicador)}
            >
              <div className={cn(styles.icono_datos_indicador)}>
                <Image
                  src="/images/iniciativas/descripcion/icono_iniciativas.png"
                  width={100}
                  height={100}
                  objectFit="contain"
                  layout="responsive"
                  alt="icono-iniciativas"
                ></Image>
              </div>
              <p className={cn("texto_descripcion_iniciativa")}>
                {post.acf.indicadores.numero_iniciativas_rsu} iniciativas RSU
              </p>
            </Col>
          </Row>
        </div>
        <div className={cn(styles.seccion, styles.seccion_detalles_iniciativa)}>
          <h2 className={cn(styles.subtitulo_seccion)}>
            Detalles de la iniciativa
          </h2>
          <Row className={cn(styles.contenedor_no_texto, "flex-center-center")}>
            <Col
              lg={4}
              className={cn(
                styles.contenedor_detalle,
                "flex-column-center-center"
              )}
            >
              <div>
                <p className={cn("texto_descripcion_iniciativa")}>
                  <strong className={"texto_descripcion_iniciativa_strong"}>
                    Categoría:
                  </strong>
                  {` ${post.acf.datos_generales.categoria}`}
                </p>
                <p className={cn("texto_descripcion_iniciativa")}>
                  <strong className={"texto_descripcion_iniciativa_strong"}>
                    Estrategia:
                  </strong>
                  {` ${post.acf.datos_generales.estrategia}`}
                </p>
                <p className={cn("texto_descripcion_iniciativa")}>
                  <strong className={"texto_descripcion_iniciativa_strong"}>
                    Año:
                  </strong>
                  {` ${post.acf.datos_generales.ano}`}
                </p>
              </div>
            </Col>
            <Col
              lg={4}
              className={cn(
                styles.contenedor_detalle,
                "flex-column-center-center"
              )}
            >
              <div>
                <p className={cn("texto_descripcion_iniciativa")}>
                  <strong className={"texto_descripcion_iniciativa_strong"}>
                    Coordinador/a:
                  </strong>
                  {` ${post.acf.datos_generales.coordinadora}`}
                </p>
                <p className={cn("texto_descripcion_iniciativa")}>
                  <strong className={"texto_descripcion_iniciativa_strong"}>
                    Especialidad:
                  </strong>
                  {` ${post.acf.datos_generales.especialidad}`}
                </p>
                <p className={cn("texto_descripcion_iniciativa")}>
                  <strong className={"texto_descripcion_iniciativa_strong"}>
                    Contacto:
                  </strong>
                  {` ${post.acf.datos_generales.contacto}`}
                </p>
              </div>
            </Col>
          </Row>
        </div>
        <div
          className={cn(
            styles.contenedor_pie_pagina,
            "flex-column-center-center"
          )}
        >
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

// export async function getStaticPaths() {
//   const posts = await getAllPosts();

//   const paths = posts.map((post) => ({
//     params: {
//       id: post.id.toString(),
//     },
//   }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   const res = await axios.get(`${INICIATIVAS_API_URL}/${params.id}`);
//   const post = res.data;

//   return {
//     props: { post: post },
//   };
// }

export async function getServerSideProps({ params }) {
  const res = await axios.get(`${INICIATIVAS_API_URL}/${params.id}`);
  const post = res.data;

  return {
    props: { post: post },
  };
}
