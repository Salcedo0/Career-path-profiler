import { MongoClient } from 'mongodb';
import { getEmbedding } from '../utils/getEmbeddings.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export const createFieldEmbedding = async() => {

    const client = new MongoClient(process.env.MONGOURI);

    try {

        await client.connect();
        const collection = client.db("magneto").collection("jobs_excel");
        const documents = await collection.find().toArray();

        const batchSize = 10;
        for (let i = 0; i < documents.length; i += batchSize) {
            const batch = documents.slice(i, i + batchSize);
            const updateDocuments = [];

            for (const doc of batch) {
                const embedding = await getEmbedding(doc.title);
                updateDocuments.push({
                    updateOne: {
                        filter: { "_id": doc._id },
                        update: { $set: { "nombre_vacante_embedding": embedding } }
                    }
                });
            }

            if (updateDocuments.length > 0) {
                const options = { ordered: false };
                const result = await collection.bulkWrite(updateDocuments, options);
                console.log(`Batch ${i / batchSize + 1}: ${result.modifiedCount} documentos actualizados`);
            }
        }
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
}

createFieldEmbedding().catch(console.dir);
