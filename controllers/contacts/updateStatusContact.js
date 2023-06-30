const { NotFound } = require('http-errors');
const {Contact} = require('../../models');

const updateStatusContact = async (req, res) => {
    const {id} = req.params;
    const {favorite} = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(id, {favorite}, {new: true});
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

module.exports = updateStatusContact;