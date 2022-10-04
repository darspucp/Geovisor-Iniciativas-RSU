import React from "react";
import Image from "next/image";
import cn from "classnames";
import  { getCifrasPortada } from "../../../lib/utils";
import  { getImageGif } from "../../../lib/utils";
import styles from "./IniciativasChart.module.scss";
import stylesHome from "../../../styles/Home.module.scss";

class IniciativasChart extends React.Component {

  constructor(props){
    super(props) 
    this.state = {
      data: [],
      gif: ""
    };
  }


  async getDataPortada(){
    let result = await getCifrasPortada();
    //console.log(result);
      this.setState({
        data: result
      })
  }

  async getGifUrl(){
    let imgGif = await getImageGif();
   // console.log('dentro de funcion'+imgGif);
      this.setState({
        gif: imgGif
      })
  }

  componentDidMount = () => {
    this.getDataPortada();
    this.getGifUrl();

  }

   generarDatos =  () => {
    //this.getDataPortada();
    var datosContenido = this.state.data.map((dato, index) => {
      return (
        <div
          className={cn(styles.fila_dato, "flex-start-center")}
          key={dato.numero + index}
        >
          <h3 className={cn(styles.numero_dato, "texto_color_principal")}>
            {`${dato.numero}`}
            {}
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
    console.log('estado gif'+this.state.gif);
    return (
      <>
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
       <div className={stylesHome.gif_iniciativas}>
       <Image
         src={`${this.state.gif}`}
         width={2480}
         height={3507}
         layout="responsive"
         objectFit="contain"
         alt="gif-iniciativas"
       ></Image>
     </div>
    </>
    );
  }
}

export default IniciativasChart;
