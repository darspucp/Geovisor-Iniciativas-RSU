import axios from "axios";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [geograficaResponse, facultadResponse] = await Promise.all([
        axios.get('https://admvisor-rsu.pucp.edu.pe/wp-json/wp/v2/div_geografica'),
        axios.get('https://admvisor-rsu.pucp.edu.pe/wp-json/wp/v2/facultad_academica'),
      ]);

      if (geograficaResponse.status === 200 && facultadResponse.status === 200) {
        const geograficaData = geograficaResponse.data.map(({name, count }) => ({ name, count }));
        const facultadData = facultadResponse.data.map(({ name, count }) => ({ name, count }));

        return res.status(200).json({
          geografica: geograficaData,
          facultad: facultadData,
        });
      } else {
        return res.status(500).json({ error: 'Hubo un problema al obtener los datos.' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Hubo un error en la solicitud.' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido.' });
}
