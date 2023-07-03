const {Contact} = require('../../models');

const getAll = async (req, res) => {
    const {_id} = req.user;
    let contacts;
    if (req.query.page && req.query.page > 0) {
        const {page, limit = 20} = req.query;
        const skip = (page - 1) * limit;
        contacts = await Contact.find({owner: _id}, "", {skip, limit: Number(limit)}).populate("owner", "_id email subscription");
    } else if (req.query.favorite) {
        const {favorite} = req.query;
        contacts = await Contact.find({owner: _id, favorite}).populate("owner", "_id email subscription");
    } else {
        contacts = await Contact.find({owner: _id}).populate("owner", "_id email subscription");
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result: contacts
        }
    });
};

module.exports = getAll;