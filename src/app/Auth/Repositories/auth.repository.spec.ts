import {AuthRepository} from './auth.repository';
import {mongodbCollection} from '../../../external/mongodb';
import {UserDataEntity} from '../Entity/UserData.entity';

describe('Test repository with real db', () => {
    const repository = new AuthRepository();
    afterEach(async () => {
        const cols = await mongodbCollection(AuthRepository.COLLECTION_NAME);
        try {
            await cols.drop();
        } catch (err) {
            console.log('Collection not exists', AuthRepository.COLLECTION_NAME);
        }
    });
    it('should able to function normally', () => {
        return expect(
            (async () => {
                if (!(await repository.getUserByUsername('test-user@example.com'))) {
                    await repository.createUser(
                        new UserDataEntity({
                            username: 'test-user@example.com',
                            passwordHashed: 'test',
                            extraData: {test: true},
                        })
                    );
                }
                const userData = await repository.getUserByUsername('test-user@example.com');
                expect(typeof userData!.id).toBe('string');
                expect(userData!.passwordHashed).toStrictEqual('test');
                expect(userData!.username).toStrictEqual('test-user@example.com');
                expect(userData!.registerDate).toBeInstanceOf(Date);
                return true;
            })()
        ).resolves.toBe(true);
    });
});
