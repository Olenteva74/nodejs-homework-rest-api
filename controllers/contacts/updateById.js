const { NotFound } = require('http-errors');
const contactsOperations = require('../../models/contacts');

const updateById = async (req, res) => {
    const {id} = req.params;
    const updatedContact = await contactsOperations.updateContact(id, req.body);
    if (!updatedContact) {
        throw new NotFound(`Contact whis id=${id} not found`);
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            updatedContact
        }
    });
};

module.exports = updateById;