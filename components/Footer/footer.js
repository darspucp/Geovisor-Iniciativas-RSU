import React from "react";
import Image from "next/image";

import cn from "classnames";

import styles from "./footer.module.scss";
import Link from "next/link";
import { Row, Col, Container } from "react-bootstrap";

class Footer extends React.Component {
  render() {
    return (
      <div
        className={cn(
          styles.footer,
          "flex-column-center-start-main",
          "padding-lateral",
          "padding-vertical-footer"
        )}
      >
        <Row className={cn(styles.contenedor_datos_footer)}>
          <Col lg={4}>
            <div className={cn(styles.direccion, "flex-column-center-start")}>
              <Link href="/">
                <a className={styles.logo_dars_blanco}>
                  <Image
                    src="/images/footer/logo_dars_blanco.png"
                    width={328}
                    height={126}
                    layout="responsive"
                    objectFit="contain"
                    alt="logo-dars-blanco"
                  ></Image>
                </a>
              </Link>
              <p className="texto_footer">Av. Universitaria N°1801</p>
              <p className="texto_footer">San Miguel, Lima 32 - Perú</p>
            </div>
          </Col>
          <Col lg={4}>
            <div className={cn(styles.contacto, "flex-column-center-start")}>
              <div className={cn(styles.contenedor_header_footer)}>
                <h3 className="texto_footer_bold">Contacto</h3>
              </div>
              <p className="texto_footer">626-2000 anexo 2142</p>
              <p className="texto_footer">dars@pucp.pe</p>
            </div>
          </Col>
          <Col lg={4}>
            <div className={cn(styles.contacto, "flex-column-center-start")}>
              <div className={cn(styles.contenedor_header_footer)}>
                <h3 className="texto_footer_bold">Síguenos</h3>
              </div>
              <div
                className={cn(
                  styles.contenedor_redes_sociales,
                  "flex-center-center"
                )}
              >
                <Link href="https://es-la.facebook.com/pucpdars/">
                  <a target="_blank" className={cn(styles.icono_red_social)}>
                    <Image
                      src="/images/footer/icono_facebook_blanco.png"
                      width={41}
                      height={41}
                      layout="responsive"
                      objectFit="contain"
                      alt="icono-facebook"
                    ></Image>
                  </a>
                </Link>
                <Link href="https://www.instagram.com/pucp/?hl=es-la">
                  <a target="_blank" className={cn(styles.icono_red_social)}>
                    <Image
                      src="/images/footer/icono_instagram_blanco.png"
                      width={41}
                      height={41}
                      layout="responsive"
                      objectFit="contain"
                      alt="icono-instagram"
                    ></Image>
                  </a>
                </Link>
                <Link href="https://twitter.com/pucp">
                  <a target="_blank" className={cn(styles.icono_red_social)}>
                    <Image
                      src="/images/footer/icono_twitter_blanco.png"
                      width={41}
                      height={41}
                      layout="responsive"
                      objectFit="contain"
                      alt="icono-twitter"
                    ></Image>
                  </a>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
        <div className={cn(styles.contenedor_copyright)}>
          <p className="texto_footer">
            © 2021 Pontificia Universidad Católica del Perú - Todos los derechos
            reservados
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
