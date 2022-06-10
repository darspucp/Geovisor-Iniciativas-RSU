import React from "react";
import dynamic from "next/dynamic";
import $ from "jquery";

import cn from "classnames";
import "overlayscrollbars/css/OverlayScrollbars.css";
import styles from "./SidebarIniciativas.module.scss";
import {
  getAllIniciativasByCategoryFromServer,
  getAllIniciativasByCategoryNameFromServer,
  fetchPostsByCategory,
} from "../../lib/utils";

import { AMBITO_NACIONAL_SLUG, CENTRO_PERU } from "../../lib/constants";

import listaDepartamentos from "../../public/raw/ambito_departamental.json";
import listaRegiones from "../../public/raw/ambito_regional.json";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import OverlayScrollbars from "overlayscrollbars";
import HeaderSidebarIniciativas from "./HeaderSidebarIniciativas";
import BackButton from "../BackButton/BackButton";
import CloseButton from "../CloseButton/CloseButton";
import BotonAmbito from "./BotonAmbito";
import CarouselIniciativas from "./CarouselIniciativas";

class SidebarIniciativas extends React.Component {
  constructor(props) {
    super(props);
    this.bodyRef = React.createRef();
    this.state = {
      categorias: [],
      etapaFlujo: 1,
      ambitoSelected: "",
      idAmbitoSelected: 0,
      regionesPorAmbito: [],
      departamentosPorAmbito: [],
      departamentoRegionSelected: "",
      idDepartamentoSelected: 0,
      iniciativasPorAmbito: [],
      iniciativasCarousel: [],
      layersId: [],
      sourcesId: [],
      search_text: '',
    };
  }

  componentDidMount() {
    OverlayScrollbars(this.bodyRef, {
      nativeScrollbarsOverlaid: {
        initialize: false,
      },
    });
  }

  ambitos = [
    { id: 1, titulo_boton: "Ámbito nacional", option: "nacional" },
    { id: 2, titulo_boton: "Ámbito regional", option: "regional" },
    { id: 3, titulo_boton: "Ámbito departamental", option: "departamental" },
  ];

  closeButtonClicked = () => {
    $("." + styles.contenedor_iniciativas).fadeOut();
  };

  addHeader = () => {
    if (this.state.etapaFlujo != 1) {
      return (
        <HeaderSidebarIniciativas>
          <BackButton
            onClickBack={() => {
              this.removeLayers();
              this.removeSources();

              if (this.state.ambitoSelected == "Ámbito nacional") {
                this.setState((state) => ({
                  etapaFlujo: state.etapaFlujo - 2,
                  layersId: [],
                  sourceId: [],
                }));
              } else {
                if (this.state.etapaFlujo == 3) {
                  this.props.mapa.flyTo({
                    center: [CENTRO_PERU.lng, CENTRO_PERU.lat],
                    zoom: 4.5,
                  });
                }

                this.setState((state) => ({
                  etapaFlujo: state.etapaFlujo - 1,
                  layersId: [],
                  sourceId: [],
                }));
              }
            }}
          ></BackButton>
          <CloseButton
            onClickCerrar={() => {
              this.closeButtonClicked(this.state.etapaFlujo);
            }}
          ></CloseButton>
        </HeaderSidebarIniciativas>
      );
    } else {
      return (
        <HeaderSidebarIniciativas>
          <CloseButton
            onClickCerrar={() => {
              this.closeButtonClicked(this.state.etapaFlujo);
            }}
          ></CloseButton>
        </HeaderSidebarIniciativas>
      );
    }
  };

  getMainOptionsButtons = () => {
    var botonAmbitos = this.ambitos.map((ambito, index) => {
      return (
        <BotonAmbito
          key={`${ambito}-${index}`}
          titulo_boton={ambito.titulo_boton}
          icon={true}
          onClick={async () => {
            if (ambito.option == "nacional") {
              let iniciativasNacionales =
                await getAllIniciativasByCategoryFromServer("nacional");
              this.setState({
                iniciativasCarousel: iniciativasNacionales,
                etapaFlujo: 3,
                ambitoSelected: ambito.titulo_boton,
                idAmbitoSelected: ambito.id,
                iniciativasCarousel: iniciativasNacionales,
              });
            } else if (ambito.option == "regional") {
              this.setState({
                regionesPorAmbito: listaRegiones.regiones,
                etapaFlujo: 2,
                ambitoSelected: ambito.titulo_boton,
                idAmbitoSelected: ambito.id,
              });
            } else if (ambito.option == "departamental") {
              this.setState({
                departamentosPorAmbito: listaDepartamentos.departamentos,
                etapaFlujo: 2,
                ambitoSelected: ambito.titulo_boton,
                idAmbitoSelected: ambito.id,
              });
            }
          }}
        ></BotonAmbito>
      );
    });

    return botonAmbitos;
  };

  renderDepartamentosoRegiones = (listaElementos) => {
    var elementos = listaElementos.map((elemento, index) => {
      return (
        <h4
          key={`${elemento.nombre}-${index}`}
          className={cn("texto_link_departamento")}
          onClick={async () => {
            let iniciativasPorAmbito = await fetchPostsByCategory(
              elemento.slug
            );
            this.addLayerToMap(elemento.slug);

            if (this.state.ambitoSelected == "Ámbito departamental") {
              let departamento = this.getDepartamentoJsonFromSlug(
                elemento.slug
              );
              this.props.mapa.flyTo({
                center: [departamento.lng, departamento.lat],
                zoom: 6,
                offset: [-300, 0],
              });
            }

            this.setState((state, props) => ({
              departamentoRegionSelected: elemento.nombre,
              iniciativasCarousel: iniciativasPorAmbito,
              idDepartamentoSelected: elemento.slug,
              etapaFlujo: state.etapaFlujo + 1,
            }));
          }}
        >
          {elemento.nombre}
        </h4>
      );
    });

    return elementos;
  };

  getDepartamentoJsonFromSlug = (slug) => {
    for (var i = 0; i < listaDepartamentos.departamentos.length; i++) {
      let elementoDepartamento = listaDepartamentos.departamentos[i];

      if (elementoDepartamento.slug == slug) {
        return elementoDepartamento;
      }
    }
  };

  addLayerToMap = async (layerName) => {
    if (this.state.ambitoSelected != "Ámbito nacional") {
      const data = await import(`../../public/json/${layerName}.json`);

      this.props.mapa.addSource(layerName, {
        type: "geojson",
        data: data,
      });

      if (this.state.ambitoSelected == "Ámbito departamental") {
        this.props.mapa.addLayer({
          id: layerName,
          type: "fill",
          source: layerName,
          paint: {
            "fill-color": "#9a3255",
            "fill-outline-color": "rgba(0,0,0,0.35)",
          },
        });
      } else {
        this.props.mapa.addLayer({
          id: layerName,
          type: "fill",
          source: layerName,
          paint: {
            "fill-color": "#9a3255",
            "fill-outline-color": "rgba(0,0,0,0.35)",
          },
        });
      }

      this.setState((prevState) => ({
        layersId: [...prevState.layersId, layerName],
        sourcesId: [...prevState.sourcesId, layerName],
      }));
    }
  };

  removeLayers = () => {
    this.state.layersId.forEach((layerId) => {
      if (this.props.mapa.getLayer(layerId)) {
        this.props.mapa.removeLayer(layerId);
      }
    });
  };

  removeSources = () => {
    this.state.sourcesId.forEach((sourceId) => {
      if (this.props.mapa.getSource(sourceId)) {
        this.props.mapa.removeSource(sourceId);
      }
    });
  };

  handleSearchTextChange = (e) => {
     this.setState({
       search_text: e.target.value,
     })
  }

  render() {
    return (
      <div>
        <div
          className={cn(
            styles.contenedor_iniciativas,
            "flex-column-center-center"
          )}
          ref={this.bodyRef}
        >
          {this.addHeader()}
          {this.state.etapaFlujo == 1 && (
            <div
              className={cn(
                styles.contenido_lista,
                "contenido",
                "flex-center-center"
              )}
            >
              <div
                className={cn(
                  "flex-column-center-center",
                  "contenedor_botones_ambitos"
                )}
              >
                {this.getMainOptionsButtons()}
              </div>

              <div className={cn(
                  "flex_container_top_margin"
                )}
              >
                <label><h2 className={cn("texto_link_departamento")}>Busqueda por palabra clave</h2></label>
              </div>

              <div
                className={cn(
                  "flex_div_top_margin_text"
                )}
              >
                <input 
                  type="text"
                  placeholder="Ingrese palabra clave"
                  className={cn(
                    "search_text"
                  )}
                  value={this.state.search_text}
                  onChange={this.handleSearchTextChange}
                />
              </div>

              <div
                className={cn(
                  "flex_div_top_margin"
                )}
              >
                <BotonAmbito
                  titulo_boton='Buscar'
                  icon={false}
                  onClick={async () => {
                    let iniciativasNacionales =
                    await getAllIniciativasByCategoryNameFromServer(this.state.search_text);
                    
                    this.setState({
                      iniciativasCarousel: iniciativasNacionales,
                      etapaFlujo: 3,
                      ambitoSelected: 'Ámbito nacional',
                      idAmbitoSelected: '4',
                      iniciativasCarousel: iniciativasNacionales,
                    });
                  }}
                ></BotonAmbito>
              </div>
            </div>
          )}

          {this.state.etapaFlujo == 2 && (
            <OverlayScrollbarsComponent
              className={cn(styles.scrollbar_sidebar, "scrollbar-web")}
            >
              <div
                className={cn(
                  styles.contenido_lista,
                  styles.contenido_overflow,
                  "contenido",
                  "flex-column-start-center"
                )}
              >
                <BotonAmbito
                  titulo_boton={this.state.ambitoSelected}
                ></BotonAmbito>
                {this.renderDepartamentosoRegiones(
                  this.state.ambitoSelected == "Ámbito regional"
                    ? this.state.regionesPorAmbito
                    : this.state.departamentosPorAmbito
                )}
              </div>
            </OverlayScrollbarsComponent>
          )}

          {this.state.etapaFlujo == 3 && (
            <>
              {this.state.ambitoSelected != "Ámbito nacional" && (
                <h1 className="titulo_departamento_region">
                  {this.state.departamentoRegionSelected}
                </h1>
              )}
              {this.state.iniciativasCarousel.length > 0 ? (
                <CarouselIniciativas
                  listaIniciativas={this.state.iniciativasCarousel}
                ></CarouselIniciativas>
              ) : (
                <h1 className="titulo_departamento_region">
                  No se encontaron resultados
                </h1>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default SidebarIniciativas;
