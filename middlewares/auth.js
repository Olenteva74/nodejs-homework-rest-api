const {Unauthorized} = require('http-errors');
const jwt = require('jsonwebtoken');
const {User} = require('../models');

const {SECRET_KEY} = process.env;

const auth = async(req, res, next) => {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    try {
        if (bearer !== "Bearer" || !token) {
            throw new Unauthorized("Not authorized");
        }
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user.token) {
            throw new Unauthorized("Not authorized");
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.message === "Invalid sugnature") {
            error.status = 401;
            error.message = "Not authorized";
        }
        next(error);
    }

};

module.exports = auth;