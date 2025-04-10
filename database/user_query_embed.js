import { MongoClient } from "mongodb";
import { getEmbedding } from "../utils/getEmbedding.js";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export const query= async(userPreferences, limit = 10, opt = "porNombre") => {

    const client = new MongoClient(process.env.MONGOURI);

    const searchMethod = opt === "porNombre" 
        ? {path:'nombre_vacante_embedding', index: 'magneto_search'} 
        : {path:'nombre_vacante_embedding',index: 'magneto_search'} //despues lo cambio al otro index

    try {
        await client.connect();
        const database = client.db('magneto'); // Replace with your database name
        const collection = database.collection('jobs'); // Replace with your collection name

        const embeddingTerm = await getEmbedding(userPreferences);
        
        const results = await collection.aggregate([
            {
                $vectorSearch: {
                    queryVector: embeddingTerm,
                    path: searchMethod.path,
                    numCandidates: 100,
                    limit: limit,
                    index: searchMethod.index
                }
            },
            // {
            //     $match: {
            //         _id: { $ne: vacante._id } // Exclude the same vacante by its _id
            //     }
            // },
            {
                $project: {
                    _id:0,
                    embedding: 0, // Exclude the embedding field from the results
                    score: {
                        $meta: "vectorSearchScore"
                    }
                }
            }
        ]).toArray();

        return results

    } catch (error) {
        console.error('Error deleting documents:', error);
    } finally {
        await client.close();
    }
}