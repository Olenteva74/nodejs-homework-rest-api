const {Conflict} = require('http-errors');
const gravatar = require('gravatar');
const {nanoid} = require('nanoid');
const {User} = require('../../models');
const {sendEmail}= require('../../helpers');

const {BASE_URL} = process.env;


const register = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
        throw new Conflict("Email in use");
    }
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const newUser = new User({email, avatarURL, verificationToken});
    newUser.setPassword(password);
    await newUser.save();
    const mail = {
        to: email,
        subject: "Confirm email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Confirm email</a>`
    };
    await sendEmail(mail);
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                email,
                subscription: newUser.subscription,
                avatarURL
            }
        }
    })
};

module.exports = register;
