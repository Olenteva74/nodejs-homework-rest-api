const {Unauthorized} = require('http-errors');
const jwt = require('jsonwebtoken');
const {User} = require('../../models');

const {SECRET_KEY} = process.env;

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user || !user.comparePassword(password)) {
        throw new Unauthorized("Email or password is wrong"); 
    }
    if (!user.verify) {
        throw new Unauthorized("Email not verified");
    }
    const payload = {
        id: user._id
    };
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
        token,
        user: {
            email,
            subscription: user.subscription
            }
    });
}

module.exports = login;