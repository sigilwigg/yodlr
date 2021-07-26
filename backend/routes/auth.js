// ----- [///// DEPENDENCIES /////] -----
const express = require('express');
const router = express.Router();
const jsonschema = require("jsonschema");
const User = require('../models/user');

const { createToken } = require('../helpers/tokens');
const { BadRequestError } = require('../expressError');

const userLoginSchema = require('../schemas/userLogin.json');
const userRegisterSchema = require('../schemas/userRegister.json');


// ----- [///// ROUTES /////] -----
/* Register a new user */
router.post('/register', async function (req, res, next) {
    try {
        // validation
        const validator = jsonschema.validate(req.body, userRegisterSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        // register with validated data
        let newUserData = req.body;
        let newUser = await User.register(newUserData);
        let id = newUser.id;
        let token = createToken(newUser);
        return res.json({ token, id })
    } catch (err) {
        return next(err);
    }
});

/* User login */
router.post('/login', async function (req, res, next) {
    try {
        // validation
        const validator = jsonschema.validate(req.body, userLoginSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        // login with validated data
        let { email, password } = req.body;
        let user = await User.authenticate(email, password);
        let id = user.id;
        let token = createToken(user);
        return res.json({ token, id })
    } catch (err) {
        return next(err);
    }
});


// ----- [///// EXPORTS /////] -----
module.exports = router;