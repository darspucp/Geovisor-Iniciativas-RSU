import Image from "next/image";
import Link from "next/link";

import cn from "classnames";

import styles from "../styles/Home.module.scss";
import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";
import IniciativasChart from "../components/Home/IniciativasChart/IniciativasChart";
import { Row, Col, Container } from "react-bootstrap";

import mapaHome from "../public/images/home/mapa_home.png";
import React from "react";

class Home extends React.Component {
  iniciativas = [
    {
      nombreProyecto: "TRANSformando vidas",
      ubicacionProyecto: "Nacional",
      descripcion:
        "Consolidación de espacios de debate y discusión para fortalecer competencias de liderazgo, sensibilidad interpersonal y capacidad crítica de personas trans que viven en el Perú desde un enfoque interseccional y feminista. Se compartieron herramientas de autocuidado para promover su bienestar personal, se formaron redes de soporte intra e inter grupales y se aperturaron espacios de acompañamiento terapéutico para quienes lo requirieron.",
      imgSrc: "/images/home/imagen_transformando_vidas.png",
      redirect_url:
        "https://visor-rsu.pucp.edu.pe/iniciativas/descripcion/iniciativa/177",
      link_facebook: "https://www.facebook.com/transformandovidas.pe ",
      link_instagram: "https://www.instagram.com/transformandovidas.pe/",
      link_twitter: "",
      link_wassap: "",
      link_web: "",
    },
    {
      nombreProyecto: "La tiendita del reciclador",
      ubicacionProyecto: "Lima Metropolitana y Callao",
      descripcion:
        "Desarrollo de sesiones de capacitación a los recicladores formalizados de la Municipalidad Distrital de Comas para la elaboración de productos con valor agregado a partir del aprovechamiento de residuos inorgánicos recolectados. Los productos finales tales como bolsos, carteras y cartucheras elaborados con cuero de plástico fueron ofertados en una plataforma virtual de venta en línea.",
      imgSrc: "/images/home/imagen_tiendita_reciclador.png",
      redirect_url:
        "https://visor-rsu.pucp.edu.pe/iniciativas/descripcion/iniciativa/167",
      link_facebook: "",
      link_instagram: "",
      link_twitter: "",
      link_wassap: "",
      link_web: "https://latienditadelreciclador.pe/",
    },
  ];

  getIniciativas = () => {
    var iniciativasRender = this.iniciativas.map((iniciativa, index) => {
      return (
        <Col className={styles.contenedor_card_iniciativa} lg={5} key={index}>
          <div
            className={cn(styles.card_iniciativa, "flex-column-center-start-main")}
          >
            <div
              className={styles.imagen_iniciativa}
              onMouseEnter={() => {
                document
                  .getElementById(iniciativa.nombreProyecto)
                  .classList.add("contenedor_descripcion_in");
                document
                  .getElementById(iniciativa.nombreProyecto)
                  .classList.remove("contenedor_descripcion_out");
              }}
            >
              <Image
                src={iniciativa.imgSrc}
                width={773}
                height={500}
                layout="responsive"
                objectFit="contain"
                alt={iniciativa.nombreProyecto}
              ></Image>
            </div>
            <h3 className={cn("titulo_card")}>{iniciativa.nombreProyecto}</h3>
            <p className={cn("texto_detalle")}>
              {iniciativa.ubicacionProyecto}
            </p>
            <div
              className={cn(
                styles.contenedor_redes_sociales,
                "flex-center-center"
              )}
            >
              {iniciativa.link_facebook != "" && (
                <Link href={iniciativa.link_facebook}>
                  <a target="_blank" className={cn(styles.icono_red_social)}>
                    <Image
                      src="/images/home/icono_facebook.png"
                      width={41}
                      height={41}
                      layout="responsive"
                      objectFit="contain"
                      alt="icono-facebook"
                    ></Image>
                  </a>
                </Link>
              )}
              {iniciativa.link_instagram != "" && (
                <Link href={iniciativa.link_instagram}>
                  <a target="_blank" className={cn(styles.icono_red_social)}>
                    <Image
                      src="/images/home/icono_instagram.png"
                      width={41}
                      height={41}
                      layout="responsive"
                      objectFit="contain"
                      alt="icono-instagram"
                    ></Image>
                  </a>
                </Link>
              )}
              {iniciativa.link_twitter != "" && (
                <Link href={iniciativa.link_twitter}>
                  <a target="_blank" className={cn(styles.icono_red_social)}>
                    <Image
                      src="/images/home/icono_twitter.png"
                      width={41}
                      height={41}
                      layout="responsive"
                      objectFit="contain"
                      alt="icono-twitter"
                    ></Image>
                  </a>
                </Link>
              )}
              {iniciativa.link_web != "" && (
                <Link href={iniciativa.link_web}>
                  <a target="_blank" className={cn(styles.icono_red_social)}>
                    <Image
                      src="/images/home/icono_web.png"
                      width={41}
                      height={41}
                      layout="responsive"
                      objectFit="contain"
                      alt="icono-wassap"
                    ></Image>
                  </a>
                </Link>
              )}
            </div>

            <Link href={iniciativa.redirect_url}>
              <a target="_blank">
                <div
                  id={iniciativa.nombreProyecto}
                  className={cn(
                    styles.contenedor_descripcion_iniciativa,
                    "flex-center-center"
                  )}
                  onMouseLeave={() => {
                    document
                      .getElementById(iniciativa.nombreProyecto)
                      .classList.add("contenedor_descripcion_out");
                    document
                      .getElementById(iniciativa.nombreProyecto)
                      .classList.remove("contenedor_descripcion_in");
                  }}
                >
                  <p className={cn("texto_card_interno")}>
                    {iniciativa.descripcion}
                  </p>
                </div>
              </a>
            </Link>
          </div>
        </Col>
      );
    });

    return iniciativasRender;
  };

  render() {
    return (
      <div>
        <Header></Header>
        <div>
          <div className={cn("padding-xy", "flex-between-center-top")}>
            <div
              className={cn(
                styles.titulo_subtitulo,
                "flex-column-center-start"
              )}
            >
              <div className={cn(styles.contenedor_titulo_subtitulo)}>
                <h1 className="titulo_home">
                  VISOR - <span className="subtitulo_home">RSU</span>{" "}
                </h1>
                <p className="texto_regular">
                  Iniciativas de Responsabilidad Social Universitaria (RSU)
                </p>
              </div>

              <Link href="/base-map">
                <a className="boton-accion-primaria">Ver mapa</a>
              </Link>
            </div>
            <div className={styles.imagen_mapa_home}>
              <Image
                src={mapaHome}
                layout="responsive"
                objectFit="contain"
                width={676}
                height={998}
                alt="mapa-home"
              ></Image>
            </div>
          </div>
          <div className={cn("padding-xy")}>
            <h2 className="titulo_seccion">Visión</h2>
            <p className={cn(styles.texto_intro, "texto_regular")}>
              Desde el VISOR-RSU buscamos resaltar el rol de la universidad como
              nodo articulador de diversas iniciativas de Responsabilidad Social
              Universitaria (RSU) desarrolladas por docentes, estudiantes y
              personal administrativo en diferentes territorios de nuestro país
              tomando en cuenta cartografía complementaria que ayude a su
              contextualización.
            </p>
          </div>
          <div className={cn("padding-xy")}>
            <h2 className="titulo_seccion">Iniciativas</h2>
            <div
              className={cn(
                styles.contenido_chart_iniciativas,
                "flex-around-center-main"
              )}
            >
              <IniciativasChart></IniciativasChart>
              <div className={styles.gif_iniciativas}>
                <Image
                  src="/images/home/gif_home.gif"
                  width={2480}
                  height={3507}
                  layout="responsive"
                  objectFit="contain"
                  alt="gif-iniciativas"
                ></Image>
              </div>
            </div>
          </div>
          <div className={cn("padding-xy")}>
            <h2 className="titulo_seccion">Destacadas</h2>
            <Row className="flex-around-center padding-top-only">
              {this.getIniciativas()}
            </Row>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Home;
