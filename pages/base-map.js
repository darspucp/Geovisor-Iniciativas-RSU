import React from "react";
import Image from "next/image";
import mapboxgl from "mapbox-gl";
import departamentosJson from "../public/json/departamentos.json";

import departmentLabel from "../public/json/departmentLabel.json";

import iniciativasJson from "../public/json/iniciativas.json";
import campusJson from "../public/json/campus_pucp.json";
import $ from "jquery";

import Head from "next/head";

import SidebarIniciativas from "../components/sidebar_inciativas/SidebarIniciativas";
import stylesSidebar from "..//components/sidebar_inciativas/SidebarIniciativas.module.scss";
import { CENTRO_PERU } from "../lib/constants";

import {
  getAllIniciativasAllDataFromServer
} from "../lib/utils";

class BaseMap extends React.Component {
  constructor(props) {
    super(props);
    mapboxgl.accessToken =
      "pk.eyJ1IjoidGFyaWt0YXZlcmEiLCJhIjoiY2tsZzJkeG9jMXo1cDJ2czZkNGVobW1wcSJ9.kviPJ4uULDpfim1fGfdGcg";

    this.state = {
      listaMarcadores: [],
      mapa: null,
      allData: [],
    };
  }

  mapFlying = false;

  async componentDidMount() {

    // const mapData = await getAllIniciativasAllDataFromServer();
    
    // this.setState({
    //   allData: mapData,
    // });

    // console.log(this.state.allData);

    let map = new mapboxgl.Map({
      container: "base-map-container",
      style: "mapbox://styles/tariktavera/ckqjrd3cr0rqh17qsv4l8qecn",
      center: [CENTRO_PERU.lng, CENTRO_PERU.lat],
      zoom: 5.5,
    }).addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.on("load", () => {
      this.loadBaseLayers(map);
    });
    this.setState({
      mapa: map,
    });
  }

  loadBaseLayers = (map) => {
    map.loadImage("/images/base_map/marker_iniciativa.png", (error, image) => {
      if (error) throw error;
      map.addImage("iniciativa-marker", image);

      map.addSource("departamentos", {
        type: "geojson",
        data: departamentosJson,
      });

      const layers = map.getStyle().layers;
      // Find the index of the first symbol layer in the map style.
      let firstSymbolId;
      for (const layer of layers) {
        if (layer.type === 'symbol') {
          firstSymbolId = layer.id;
          break;
        }
      }

      map.addLayer({
        id: "departamentos",
        type: "fill",
        source: "departamentos",
        paint: {
          "fill-color": {
            type: "identity",
            property: "hex",
          },
          "fill-outline-color": "rgba(0,0,0,0.35)",
          'fill-opacity': 0.8
        },
      }
      // firstSymbolId,
      // 'country-label'
      );
      
      map.addSource("iniciativas", {
        type: "geojson",
        data: iniciativasJson,
      });

      map.addLayer({
        id: "iniciativas",
        type: "symbol",
        source: "iniciativas",
        layout: {
          "icon-image": "iniciativa-marker",
          "icon-allow-overlap": true,
          "icon-size": 0.165,
        },
      });

      const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: true
      });

      map.on('click', function(e) {
        popup.remove();
      });

      map.on('click', 'iniciativas', async function(e) {
          const mapData = await getAllIniciativasAllDataFromServer();
          const description = `<div><h3>${mapData[0].acf.titulo}</h3></div><div><a target="_blank" href='/iniciativas/descripcion/iniciativa/${mapData[0].id}'>Ver iniciativa</a></div>`;
          popup.setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(description).addTo(map);
      });

      map.loadImage(
        "/images/base_map/marker_campus_pucp.png",
        (error, image) => {
          if (error) throw error;
          map.addImage("campus-marker", image);
        }
      );

      map.addSource("campus", {
        type: "geojson",
        data: campusJson,
      });

      map.addLayer({
        id: "campus",
        type: "symbol",
        source: "campus",
        layout: {
          "icon-image": "campus-marker",
          "icon-allow-overlap": true,
          "icon-size": 0.165,
        },
      });

      map.addSource('off-leash-areas', {
        'type': 'geojson',
        'data': departmentLabel,
      });
    
      map.addLayer({
        'id': 'off-leash-areas',
        'type': 'symbol',
        'source': 'off-leash-areas',
        'layout': {
        'text-field': [
          'format',
          ['get', 'FacilityName'],
          { 'font-scale': 1.1 }
        ],
        'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular']
        }
      });

    });
  };

  baseMarkerClick = (marker) => {
    this.state.map.flyTo({ center: marker.getLngLat(), zoom: 7 });
  };

  render() {
    return (
      <div className="full-screen">
        <Head>
          <title>Base Map</title>
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css"
            rel="stylesheet"
          />
        </Head>
        <div
          id="base-map-container"
          style={{ width: "100%", height: "100%" }}
        ></div>
        <SidebarIniciativas mapa={this.state.mapa}></SidebarIniciativas>
        <div
          className={stylesSidebar.boton_menu}
          onClick={() => {
            $("." + stylesSidebar.contenedor_iniciativas).fadeIn();
            $("." + stylesSidebar.contenedor_iniciativas).css(
              "display",
              "flex"
            );
          }}
        >
          <Image
            src="/images/base_map/menu_icon.png"
            width={20}
            height={20}
            layout="responsive"
            objectFit="cover"
            alt="menu-icon"
          ></Image>
        </div>
      </div>
    );
  }
}

export default BaseMap;
