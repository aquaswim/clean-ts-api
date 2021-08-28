import {Db, MongoClient, ObjectId} from 'mongodb';
import {DBError} from '../commons/Errors';

const MONGOURI = String(process.env.MONGO_URI);
const DB_NAME = `${process.env.APP_NAME || 'api'}-db-${process.env.NODE_ENV || 'dev'}`;

// lazy init the mongo database and connection
let _database: Db | undefined;
let _client: MongoClient | undefined;

async function getDB(): Promise<Db> {
    try {
        if (_database) {
            return _database;
        }
        // connect to db
        _client = await new MongoClient(MONGOURI).connect();
        _database = _client.db(DB_NAME);
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

/**
 * Close Connection
 * @return {Promise<void>}
 */
export async function closeConnection() {
    if (_client) {
        await _client.close();
        _client = undefined;
        _database = undefined;
    }
}

export const strToObjectID = (str: string) => new ObjectId(str);
