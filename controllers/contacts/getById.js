const { NotFound } = require('http-errors');
const contactsOperations = require('../../models/contacts');

const getById = async (req, res) => {
    const {id} = req.params;
    console.log(req.params);
    const contactById = await contactsOperations.getContactById(id);
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