const {BadRequest} = require('http-errors');
const {User} = require('../../models');
const {sendEmail} = require('../../services');

const {BASE_URL} = process.env;

const resendVerifyEmail = async(req, res) => {
  const {email} = req.body;
  const user = await User.findOne({email});
  if (!user) {
    throw new BadRequest("email not found");
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Confirm email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Confirm email</a>`
  };
  await sendEmail(mail);
  res.json({
    message: 'Verify email send success'
  })

};

module.exports = resendVerifyEmail;