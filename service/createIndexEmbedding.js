import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();


// connect to your Atlas deployment
const client = new MongoClient(process.env.MONGOURI);

async function run() {
  try {
    const database = client.db("mi_base_de_datos");
    const collection = database.collection("vacantes");
   
    // Define your Atlas Vector Search index
    const index = {
        name: "vector_index_by_nombre_vacante",
        type: "vectorSearch",
        definition: {
          "fields": [
            {
              "type": "vector",
              "path": "nombre_vacante_embedding",
              "similarity": "dotProduct",
              "numDimensions": 384
            }
          ]
        }
    }

    // Call the method to create the index
    const result = await collection.createSearchIndex(index);
    console.log(result);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
