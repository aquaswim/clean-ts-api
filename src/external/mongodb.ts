import {Db, MongoClient} from 'mongodb';
import {DBError} from '../commons/Errors';

const MONGOURI = String(process.env.MONGO_URI);
const DB_NAME = `${process.env.APP_NAME || 'api'}-db-${process.env.NODE_ENV || 'dev'}`;

// lazy init the mongo database
let _database: Db;

async function getDB(): Promise<Db> {
    try {
        if (_database) {
            return _database;
        }
        // connect to db
        const client = new MongoClient(MONGOURI);
        await client.connect();
        _database = client.db(DB_NAME);
        return _database;
    } catch (err) {
        throw new DBError('mongodb', err.message);
    }
}

/**
 * Get the mongodb collection
 * @param {string} name
 */
export async function mongodbCollection(name: string) {
    const _db = await getDB();
    return _db.collection(name);
}
