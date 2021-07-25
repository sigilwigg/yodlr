// ----- [///// DEPENDENCIES /////] -----
const bcrypt = require('bcrypt');
const _ = require('lodash');
const logger = require('../lib/logger');
const log = logger();
const users = require('../init_data.json').data;
let curId = _.size(users);

const { BadRequestError, NotFoundError, UnauthorizedError } = require("../expressError");
const { BCRYPT_WORK_FACTOR } = require('../config.js');


// ----- [///// CLASS /////] -----
class User {
    /* Register a new user */
    static async register(user) {
        user.id = curId++;
        if (!user.state) user.state = 'pending';
        if (!user.isAdmin) user.isAdmin = false;

        const hashedPassword = await bcrypt.hash(user.password, BCRYPT_WORK_FACTOR);
        user.password = hashedPassword;

        users[user.id] = user;
        log.info('Created user', user);
        return user;
    }

    /* Verify user login */
    static async authenticate(email, password) {
        let user
        for (let key in users) {
            if (users[key].email === email) {
                user = users[key];
                break
            }
        }

        if (!user) throw new NotFoundError();

        const isValid = await bcrypt.compare(password, user.password);
        if (isValid === true) {
            return user;
        }

        throw new UnauthorizedError("Invalid email/password");
    }

    /* Get a specific user by id */
    static async get(id) {
        let user = users[id];
        if (!user) throw new NotFoundError();
        return users[id];
    }

    /* GET users listing. */
    static async getAll() {
        let userArr = _.toArray(users);
        return userArr;
    }

    /* Update a user by id */
    static async update(user, id) {
        if (user.id != id) throw new BadRequestError('ID paramter does not match body');
        if (!users[user.id]) throw new NotFoundError();

        let dbUser = users[user.id];

        for (let item in user) {
            dbUser[item] = user[item];
        }

        log.info('Updating user', dbUser);
        return dbUser;
    }

    /* Delete a user by id */
    static async remove(id) {
        let user = users[id];
        if (!users[user.id]) throw new NotFoundError();
        delete users[id];
        log.info('Deleted user', user);
        return user;
    }
}


// ----- [///// EXPORTS /////] -----
module.exports = User;