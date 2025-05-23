import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import { getEmbedding } from "../utils/getEmbeddings.js";
dotenv.config();



const cliente = new MongoClient(process.env.MONGOURI);

const app = express();

const port = 5000


app.use(express.json());
app.use(cors({
  origin: '*'
}))
app.post('/search', async (req, res) => {

  const { term } = req.body

  const collection = cliente.db("magneto").collection("jobs");

  const embeddingTerm = await getEmbedding(term);

  const results = await collection.aggregate([
    {
      $vectorSearch: {
        queryVector: embeddingTerm,
        path: "nombre_vacante_embedding",
        numCandidates: 200,
        limit: 10,
        index: "magneto_search"
      }
    },
    // {
    //     $match: {
    //         _id: { $ne: vacante._id } // Exclude the same vacante by its _id
    //     }
    // },
    {
      $project: {
        _id: 0,
        embedding: 0, // Exclude the embedding field from the results
        score: {
          $meta: "vectorSearchScore"
        }
      }
    }
  ]).toArray();

  console.log(results)

  cliente.connect();

  res.json(results);

});

app.post('/api/visited_vacant', async (req, res) => {
  const { userId, vacant, key_words } = req.body;

  if (!userId || !vacant || !key_words) {
    return res.status(400).json({ error: 'Faltan datos requeridos: userId, vacant o key_words' });
  }

  try {
    const collection = cliente.db("magneto").collection("users");

    // Actualizar visited_vacants y key_words del usuario
    await collection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $addToSet: { 
          visited_vacants: vacant, // Agregar la vacante visitada
          key_words: { $each: key_words } // Agregar palabras clave únicas
        }
      }
    );

    res.status(200).json({ message: 'Vacante y palabras clave guardadas exitosamente' });
  } catch (error) {
    console.error('Error al guardar la vacante:', error);
    res.status(500).json({ error: 'Error al guardar la vacante' });
  }
});

app.get('/api/user_keywords', async (req, res) => {
  const userId = "68301050ddf230c5943587c0"; // Cambia esto por el ID del usuario logueado

  try {
    const collection = cliente.db("magneto").collection("users");
    const user = await collection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ key_words: user.key_words || [] });
  } catch (error) {
    console.error('Error al obtener las palabras clave del usuario:', error);
    res.status(500).json({ error: 'Error al obtener las palabras clave del usuario' });
  }
});

// Endpoint para ejecutar search.py y obtener recomendaciones
app.get('/api/recommendations', (req, res) => {
  const title = "Analista de Información"; // Cambia esto si necesitas un título dinámico

  // Ejecutar el script Python con el título como argumento
  exec(`python c:/Users/USER/Desktop/progressive_profiling_magneto/Career-path-profiler/backend/search.py "${title}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al ejecutar el script Python: ${error.message}`);
      return res.status(500).json({ error: 'Error al ejecutar el script Python' });
    }
    if (stderr) {
      console.error(`Error en el script Python: ${stderr}`);
      return res.status(500).json({ error: 'Error en el script Python' });
    }

    // Parsear la salida del script Python y enviarla como respuesta
    console.log(`Recomendaciones para "${title}":`, stdout);
    res.status(200).json({ recommendations: JSON.parse(stdout) });
  });
});


app.post('/track-time', async (req, res) => {
  const { userId, jobId, timeSpent } = req.body;

  if (!userId || !jobId || !timeSpent) {
    return res.status(400).json({ error: 'Faltan datos requeridos: userId, jobId o timeSpent' });
  }

  try {
    const collection = cliente.db("magneto").collection("user_time_tracking");

    
    await collection.insertOne({
      userId,
      jobId,
      timeSpent,
      timestamp: new Date()
    });

    res.status(200).json({ message: 'Tiempo registrado exitosamente' });
  } catch (error) {
    console.error('Error al guardar el tiempo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: 'El nombre y la contraseña son obligatorios' });
  }

  try {
    const collection = cliente.db("magneto").collection("users");

    // Verificar si el usuario ya existe
    const existingUser = await collection.findOne({ name });

    if (existingUser) {
      // Si el usuario ya existe, devolver su ID y marcar como existente
      return res.status(200).json({ userId: existingUser._id, existingUser: true });
    }

    // Crear un nuevo usuario con las variables iniciales vacías
    const newUser = {
      name,
      password,
      disliked_key_words: [],
      key_words: [],
      visited_vacants: [],
    };

    // Insertar el usuario en la base de datos
    const result = await collection.insertOne(newUser);

    // Devolver el ID del usuario creado
    res.status(201).json({ userId: result.insertedId, existingUser: false });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/update-keywords', async (req, res) => {
  const { userId, keyWords } = req.body;

  if (!userId || !keyWords) {
    return res.status(400).json({ error: 'El userId y keyWords son obligatorios' });
  }

  try {
    const collection = cliente.db("magneto").collection("users");

    // Actualizar las key_words del usuario
    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { key_words: keyWords } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Key words actualizadas correctamente' });
  } catch (error) {
    console.error('Error al actualizar las key words:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(port, () => {
  console.log('Example app listening on port ' + port)
})