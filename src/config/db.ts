import { MongoClient, Db } from 'mongodb';
// import { Book, Database } from '../@types';

const dbURL = `mongodb://localhost:27017`;
const connectDB = async () => {
    try {
        const client = await MongoClient.connect(dbURL as string);
        const db: Db = client.db('arc-erp');
        console.log('Database connected successfully');

        return db

    } catch (error) {
        console.dir('Datbase Error >>', error);
    }
};

/**
 * Closes the MongoDB client connection
 */
function dbClose(client: any) {
    if (client) {
        client.close();
    }
}

export default connectDB;
