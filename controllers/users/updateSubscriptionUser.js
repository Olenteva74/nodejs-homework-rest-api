const {User} = require('../../models');

const updateSubscriptionUser = async(req, res) => {
    const {_id} = req.user;
    const {subscription} = req.body;
    const updateUser = await User.findByIdAndUpdate(_id, {subscription}, {new: true});
    res.json({
        status: "success",
        code: 200,
        data: {
            email: updateUser.email,
            subscription
        }
    })

};

module.exports = updateSubscriptionUser;