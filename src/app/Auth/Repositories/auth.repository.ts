import {IAuthRepositoryContract} from '../Contracts/auth.repository.contract';
import {UserDataEntity} from '../Entity/UserData.entity';
import {mongodbCollection, strToObjectID} from '../../../external/mongodb';

export class AuthRepository implements IAuthRepositoryContract {
    public static COLLECTION_NAME = 'users';
    constructor() {}
    async createUser(userData: UserDataEntity): Promise<UserDataEntity> {
        const collection = await mongodbCollection(AuthRepository.COLLECTION_NAME);
        const insertResult = await collection.insertOne({
            username: userData.username,
            passwordHashed: userData.passwordHashed,
            registerDate: userData.registerDate,
            extraData: userData.extraData,
        });
        userData.id = insertResult.insertedId.toHexString();
        return userData;
    }

    async getUserByUsername(username: string): Promise<UserDataEntity | null> {
        const collection = await mongodbCollection(AuthRepository.COLLECTION_NAME);
        const userDoc = await collection.findOne({username});
        if (userDoc) {
            return new UserDataEntity<unknown>({
                id: userDoc._id.toString(),
                username: userDoc.username,
                passwordHashed: userDoc.passwordHashed,
                registerDate: userDoc.registerDate,
                extraData: userDoc.extraData,
            });
        }
        return null;
    }

    async getById(id: string): Promise<UserDataEntity | null> {
        const collection = await mongodbCollection(AuthRepository.COLLECTION_NAME);
        const userDoc = await collection.findOne({_id: strToObjectID(id)});
        if (userDoc) {
            return new UserDataEntity<unknown>({
                id: userDoc._id.toString(),
                username: userDoc.username,
                passwordHashed: userDoc.passwordHashed,
                registerDate: userDoc.registerDate,
                extraData: userDoc.extraData,
            });
        }
        return null;
    }
}
