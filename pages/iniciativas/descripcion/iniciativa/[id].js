import Image from "next/image";
import axios from "axios";
import cn from "classnames";
import { INICIATIVAS_API_URL } from "../../../../lib/constants";
import { Row, Col } from "react-bootstrap";

import styles from "./DescripcionIniciativa.module.scss";

export default function PostDescripcion({ post }) {
  return (
    <div className={styles.post_descripcion}>
      <div className={cn(styles.header)}>
        <h1 className={styles.titulo}>{post.titulo}</h1>
      </div>
      <div className={cn(styles.contenedor_datos)}>
        <div
          className={cn(styles.seccion, styles.seccion_descripcion_ubicacion)}
        >
          <Row>
            <h2 className={cn(styles.subtitulo_seccion)}>Descripción</h2>
            {post.descripcion && (
              <Col lg={12}>
                <div
                  className={cn("texto_descripcion_iniciativa")}
                  dangerouslySetInnerHTML={{
                    __html: post.descripcion,
                  }}
                ></div>
              </Col>
            )}
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
                        __html: post.ubicacion_detalle,
                      }}
                    ></div>
                  </Col>
                </Row>
                {(post.poblacion || post.hombres || post.mujeres) && <Row
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
                    <div
                      className={cn("texto_descripcion_iniciativa")}
                    >
                      {post.poblacion && <p>
                        <strong>
                          Población censada:{" "}
                        </strong>
                        {post.poblacion}
                      </p>}

                      {post.hombres && <p>
                        <strong>
                          Hombres:{" "}
                        </strong>
                        {post.hombres}
                      </p>}

                      {post.mujeres && <p>
                        <strong>
                          Mujeres:{" "}
                        </strong>
                        {post.mujeres}
                      </p>}
                    </div>
                  </Col>
                </Row>}


                {(post.viviendas_inadecuadas || post.hacinamiento || post.servicios_higienicos) && <Row
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
                    <div
                      className={cn("texto_descripcion_iniciativa")}
                    >
                      {post.viviendas_inadecuadas && <p>
                        <strong>
                          Viviendas inadecuadas:{" "}
                        </strong>
                        {post.viviendas_inadecuadas}% de
                        habitantes
                      </p>}

                      {post.hacinamiento && <p>
                        <strong>
                          Hacinamiento:{" "}
                        </strong>
                        {post.hacinamiento}% de
                        habitantes
                      </p>}


                      {post.servicios_higienicos && <p>
                        <strong>
                          Sin servicios higiénicos:{" "}
                        </strong>
                        {post.servicios_higienicos}% de
                        habitantes
                      </p>}

                    </div>
                  </Col>
                </Row>}

                {(post.asistencia_escolar || post.dependencia_economica) && <Row
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
                    <div
                      className={cn("texto_descripcion_iniciativa")}
                    >

                      {post.asistencia_escolar && <p>
                        <strong>
                          Ausentismo escolar:{" "}
                        </strong>
                        {post.asistencia_escolar}% de
                        habitantes
                      </p>}

                      {post.dependencia_economica && <p>
                        <strong>
                          Dependencia económica:{" "}
                        </strong>
                        {post.dependencia_economica}% de
                        habitantes
                      </p>}
                    </div>
                  </Col>
                </Row>}


              </div>
            </Col>
            <Col lg={6}>
              <h2 className={cn(styles.subtitulo_seccion)}>
                Objetivos de Desarrollo Sostenible
              </h2>
              <Row
                className={cn(styles.contenedor_no_texto, "flex-center-center")}
              >
                {post?.objetivos.map((ods, index) => {
                  return (
                    <Col
                      key={ods.label}
                      md={6}
                      lg={4}
                      className="flex-center-center"
                    >
                      <div className={cn(styles.icono_datos_indicador_Objetivos, "objetivos")}>
                        <Image
                          src={`/images/ods/${ods.value}.png`}
                          width={100}
                          height={100}
                          objectFit="contain"
                          layout="responsive"
                          alt="icono-mapa"
                        />
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </div>
        {(post.porcentaje_territorio_nacional ||
          post.porcentaje_poblacion_nacional ||
          post.porcentaje_habitantes_pobres || post.porcentaje_habitantes_sin_servicios ||
          post.numero_iniciativas_rsu) && <div className={cn(styles.seccion, styles.seccion_indicadores)}>
            <h2 className={cn(styles.subtitulo_seccion)}>
              Indicadores regionales
            </h2>
            <Row className={cn("flex-center-center", styles.contenedor_no_texto)}>
              {post.porcentaje_territorio_nacional && <Col
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
                  {post.porcentaje_territorio_nacional}% del
                  territorio nacional
                </p>

              </Col>}

              {post.porcentaje_poblacion_nacional && <Col
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
                  {post.porcentaje_poblacion_nacional}% de la
                  población nacional
                </p>

              </Col>}

              {post.porcentaje_habitantes_pobres && <Col
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
                  {post.porcentaje_habitantes_pobres}% de
                  habitantes son pobres *
                </p>

              </Col>}


              {post.porcentaje_habitantes_sin_servicios && <Col
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
                  {post.porcentaje_habitantes_sin_servicios}% de
                  habitantes no tienen todos los servicios básicos**
                </p>

              </Col>}


              {post.numero_iniciativas_rsu && <Col
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
                  {post.numero_iniciativas_rsu} iniciativas RSU
                </p>

              </Col>}

            </Row>
          </div>}



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
                  <strong>
                    Categoría:{" "}
                  </strong>
                  {` ${post.categoria}`}
                </p>
                <p className={cn("texto_descripcion_iniciativa")}>
                  <strong>
                    Estrategia:{" "}
                  </strong>
                  {` ${post.estrategia}`}
                </p>
                <p className={cn("texto_descripcion_iniciativa")}>
                  <strong>
                    Año:{" "}
                  </strong>
                  {` ${post.ano}`}
                </p>
              </div>
            </Col>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Col
              lg={4}
              className={cn(
                styles.contenedor_detalle,
                "flex-column-center-center"
              )}
            >
              <div>
                <p className={cn("texto_descripcion_iniciativa")}>
                  <strong>
                    Coordinador/a:{" "}
                  </strong>
                  {` ${post.coordinadora}`}
                </p>
                <p className={cn("texto_descripcion_iniciativa")}>
                  <strong >
                    Especialidad:{" "}
                  </strong>
                  {` ${post.especialidad}`}
                </p>
                <p className={cn("texto_descripcion_iniciativa")}>
                  <strong>
                    Contacto:{" "}
                  </strong>
                  {` ${post.contacto}`}
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


export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`https://visor-rsu.pucp.edu.pe/api/iniciativa/${params.id}`);
  return {
    props: { post: data },
  };
}
