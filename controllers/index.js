const add = require('./contacts/add');
const deleteById = require('./contacts/deleteById');
const getAll = require('./contacts/getAll');
const getById = require('./contacts/getById');
const updateById = require('./contacts/updateById');
const updateStatusContact = require('./contacts/updateStatusContact')

module.exports = {
    add,
    deleteById,
    getAll,
    getById,
    updateById,
    updateStatusContact
};