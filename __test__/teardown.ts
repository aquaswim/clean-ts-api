import {closeConnection} from '../src/external/mongodb';
// todo: This is not running!
const teardown = async () => {
    await closeConnection();
};

module.exports = teardown;
