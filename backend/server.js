import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
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

  const collection = cliente.db("magneto").collection("jobs_excel");

  const embeddingTerm = await getEmbedding(term);

  const results = await collection.aggregate([
    {
      $vectorSearch: {
        queryVector: embeddingTerm,
        path: "nombre_vacante_embedding",
        numCandidates: 200,
        limit: 10,
        index: "search_excel"
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

app.listen(port, () => {
  console.log('Example app listening on port ' + port)
})