import jwt  FROM  "jsonwebtoken";

export default {
    sign: (data) => jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" }),
    verify: (token) => jwt.verify(token, process.env.JWT_SECRET),
};
