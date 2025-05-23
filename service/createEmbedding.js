import { MongoClient } from 'mongodb';
import { getEmbedding } from '../utils/getEmbeddings.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export const createFieldEmbedding = async() => {

    const client = new MongoClient(process.env.MONGOURI);

    try {

        client.connect();

        const collection = client.db("magneto").collection("jobs_excel");

        const documents = await collection.find().toArray();

        const updateDocuments = [];

        await Promise.all(documents.map(async doc => {

            const embedding = await getEmbedding(doc.title);

            // Add the embedding to an array of update operations
            updateDocuments.push(
                {
                    updateOne: { 
                        filter: { "_id": doc._id },
                        update: { $set: { "nombre_vacante_embedding": embedding } }
                    }
                }
           )
       }));

       // Continue processing documents if an error occurs during an operation
       const options = { ordered: false };

       // Update documents with the new embedding field
       const result = await collection.bulkWrite(updateDocuments, options); 
       console.log("Count of documents updated: " + result.modifiedCount); 
            
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
createFieldEmbedding().catch(console.dir);
