// ----- [///// CONFIG /////] -----
/** Secret Key Stuff */
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev-key";

/** bCrypt Security */
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;


// ----- [///// EXPORTS /////] -----
module.exports = {
    SECRET_KEY,
    BCRYPT_WORK_FACTOR
};