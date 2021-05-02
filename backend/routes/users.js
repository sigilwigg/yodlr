// ----- [///// DEPENDENCIES /////] -----
var express = require('express');
var router = express.Router();
const User = require('../models/user');


// ----- [///// ROUTES /////] -----
/* Get a specific user by id */
router.get('/:id', async function (req, res, next) {
    try {
        const user = await User.get(req.params.id);
        return res.json(user);
    } catch (err) {
        return next(err);
    }
});

/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        let users = await User.getAll();
        return res.json(users);
    } catch (err) {
        return next(err);
    }
});

/* Update a user by id */
router.patch('/:id', async function (req, res, next) {
    try {
        const user = req.body;
        const updatedUser = await User.update(user, req.params.id)
        return res.json(updatedUser);
    } catch (err) {
        return next(err);
    }
});

/* Delete a user by id */
router.delete('/:id', async function (req, res, next) {
    try {
        const response = await User.remove(req.params.id);
        res.status(204);
        return res.json(response);
    } catch (err) {
        return next(err);
    }
});

// ----- [///// EXPORTS /////] -----
module.exports = router;