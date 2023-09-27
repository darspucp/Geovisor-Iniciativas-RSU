import React from "react";
import Image from "next/image";
import cn from "classnames";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { getCifrasPortada } from "../../../lib/utils";
import { getImageGif } from "../../../lib/utils";
import styles from "./IniciativasChart.module.scss";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const chartOptions = {
  plugins: { legend: { display: false } },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        font: {
          weight: 'bold',
          size: 16
        },
        color: 'black',
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0,
        font: {
          weight: 'bold',
          size: 16,
        },
        color: 'black'
      },
    },
  }
};



class IniciativasChart extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      gif: "",
      geografica: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [
            '#7ED957',
            '#FF914D',
            '#FFBD59',
            '#31356E',
          ],
          hoverOffset: 1,
        }]
      },
      facultad: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: "#FEBD59",
          hoverOffset: 1,
        }]
      }
    };
  }




  async getDataPortada() {
    let result = await getCifrasPortada();
    //console.log(result);
    this.setState({
      data: result
    })
  }

  async getGifUrl() {
    let imgGif = await getImageGif();
    // console.log('dentro de funcion'+imgGif);
    this.setState({
      gif: imgGif
    })
  }

  async getDataGrafica() {
    try {
      const { data: { geografica, facultad } } = await axios.get('/api/grafica');

      this.setState({
        geografica: {
          labels: geografica.map((item) => item.name),
          datasets: [{
            data: geografica.map((item) => item.count),
            backgroundColor: [
              '#7ED957',
              '#FF914D',
              '#FFBD59',
              '#31356E',
            ],
            hoverOffset: 1,
          }]
        },
        facultad: {
          labels: facultad.map((item) => item.name),
          datasets: [{
            data: facultad.map((item) => item.count),
            backgroundColor: "#FEBD59",
            hoverOffset: 1,
          }]
        }
      })
    } catch (e) {
      console.error(e);
    }
  }

  componentDidMount = () => {
    this.getDataPortada();
    this.getGifUrl();
    this.getDataGrafica();
  }

  render() {
    return (
      <div className={cn(styles.iniciativas)}>
        <div className={cn(styles.contedor)}>
          <div className={cn(styles.contenedor_dona)}>
            <Doughnut 
            data={this.state.geografica} />
          </div>
          <div className={styles.contedor_gif}>
            <Image
              src={`${this.state.gif}`}
              width={500}
              height={500}
              layout="responsive"
              objectFit="contain"
              alt="gif-iniciativas"
            ></Image>
          </div>
        </div>


        <div className={cn(styles.contenedor_bar)}>
          <Bar
            options={chartOptions}
            data={this.state.facultad}
          />
        </div>
      </div>
    );
  }
}

export default IniciativasChart;
