const add = require('./contacts/add');
const deleteById = require('./contacts/deleteById');
const getAll = require('./contacts/getAll');
const getById = require('./contacts/getById');
const updateById = require('./contacts/updateById');

module.exports = {
    add,
    deleteById,
    getAll,
    getById,
    updateById
};