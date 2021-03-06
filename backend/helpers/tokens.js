// ----- [///// DEPENDENCIES /////] -----
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config.js");


// ----- [///// MAIN /////] -----
/** Create and sign a JWT token */
function createToken(user) {
    console.assert(user.isAdmin !== undefined,
        "createToken passed user without isAdmin property");
    let payload = {
        email: user.email,
        isAdmin: user.isAdmin || false,
    };
    return jwt.sign(payload, SECRET_KEY);
}


// ----- [///// EXPORTS /////] -----
module.exports = { createToken };