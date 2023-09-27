import axios from "axios";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      
      const { id } = req.query
      const {data} = await  axios.get(`https://admvisor-rsu.pucp.edu.pe/wp-json/wp/v2/iniciativa/${id}`);
      const ambito = data.ambito[0];
      const {data:data2} = await  axios.get(`https://admvisor-rsu.pucp.edu.pe/wp-json/wp/v2/ambito/${ambito}`);

      const response = {
        titulo: data.acf.titulo,
        descripcion: data.acf.descripcion,
        ubicacion_detalle: data.acf.ubicacion_detalle,
        objetivos: data.acf?.ODS?.objetivos,
        poblacion: data2.acf.datos_complementarios?.poblacion,
        hombres:  data2.acf.datos_complementarios?.hombres,
        mujeres:  data2.acf.datos_complementarios?.mujeres,
        viviendas_inadecuadas:  data2.acf.datos_complementarios?.viviendas_inadecuadas,
        hacinamiento:  data2.acf.datos_complementarios?.hacinamiento,
        servicios_higienicos:  data2.acf.datos_complementarios?.servicios_higienicos,
        asistencia_escolar:  data2.acf.datos_complementarios?.asistencia_escolar,
        dependencia_economica:  data2.acf.datos_complementarios?.dependencia_economica,
        porcentaje_territorio_nacional:  data2.acf.indicadores?.porcentaje_territorio_nacional,
        porcentaje_poblacion_nacional:  data2.acf.indicadores?.porcentaje_poblacion_nacional,
        porcentaje_habitantes_pobres:  data2.acf.indicadores?.porcentaje_habitantes_pobres,
        porcentaje_habitantes_sin_servicios:  data2.acf.indicadores?.porcentaje_habitantes_sin_servicios,
        numero_iniciativas_rsu:  data2.acf.indicadores?.numero_iniciativas_rsu,
        categoria: data.acf.datos_generales.categoria,
        estrategia: data.acf.datos_generales.estrategia,
        ano: data.acf.datos_generales.ano,
        coordinadora: data.acf.datos_generales.coordinadora,
        especialidad: data.acf.datos_generales.especialidad,
        contacto: data.acf.datos_generales.contacto,
      }
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Hubo un error en la solicitud.' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido.' });
}
