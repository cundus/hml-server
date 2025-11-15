const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

async function hashPassword(plain) {
    return bcrypt.hash(plain, saltRounds);
}

async function comparePassword(plain, hash) {
    return bcrypt.compare(plain, hash);
}

module.exports = { hashPassword, comparePassword };
