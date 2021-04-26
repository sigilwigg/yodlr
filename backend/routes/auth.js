// ----- [///// DEPENDENCIES /////] -----
const express = require('express');
const router = express.Router();
const User = require('../models/user');

const { createToken } = require('../helpers/tokens');


// ----- [///// ROUTES /////] -----
/* Register a new user */
router.post('/register', async function (req, res, next) {
    try {
        // validation

        // register with validated data
        let newUserData = req.body;
        let newUser = await User.register(newUserData);
        let token = createToken(newUser);
        return res.json({ token })
    } catch (err) {
        return next(err);
    }
});

/* User login */
router.post('/login', async function (req, res, next) {
    try {
        // validation

        // login with validated data
        let { id, password } = req.body;
        let user = await User.authenticate(id, password);
        let token = createToken(user);
        return re.json({ token })
    } catch (err) {
        return next(err);
    }
});


// ----- [///// EXPORTS /////] -----
module.exports = router;