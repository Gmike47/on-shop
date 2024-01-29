const createError = require('http-errors');
const UserModel = require('../models/user');
const userModelInstance = new UserModel();

module.exports = class UserService {

    async get(data) {
        const {id} = data;

        try {
            const user = await userModelInstance.findById(id);

            if(!user) {
                throw createError(404, 'user record not found!');
            }

            return user;

        } catch(err) {
            throw err
        }
    };

    async update(data) {
        try {
            const user = await userModelInstance.update(data);
            return user;

        } catch(err) {
            throw err;
        }
    };
}