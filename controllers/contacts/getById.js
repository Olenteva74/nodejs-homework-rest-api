const { NotFound } = require('http-errors');
const {Contact} = require('../../models');

const getById = async (req, res) => {
    const {id} = req.params;
    const contactById = await Contact.findById(id);
    if (!contactById) {
        throw new NotFound(`Contact whis id=${id} not found`);
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            contactById
        }
    });
};

module.exports = getById;