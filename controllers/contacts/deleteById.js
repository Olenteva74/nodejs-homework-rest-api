const { NotFound } = require('http-errors');
const contactsOperations = require('../../models/contacts');

const deleteById = async (req, res) => {
    const {id} = req.params;
    const removedContact = await contactsOperations.removeContact(id);
    if (!removedContact) {
        throw new NotFound(`Contact whis id=${id} not found`);     
    }
    res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
        data: {
            removedContact
        }
    });
};

module.exports = deleteById;