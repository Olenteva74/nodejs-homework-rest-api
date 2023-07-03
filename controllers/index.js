const add = require('./contacts/add');
const deleteById = require('./contacts/deleteById');
const getAll = require('./contacts/getAll');
const getById = require('./contacts/getById');
const updateById = require('./contacts/updateById');
const updateStatusContact = require('./contacts/updateStatusContact');
const register = require('./auth/register');
const login = require('./auth/login');
const getCurrent = require('./users/getCurrent');
const logout = require('./auth/logout');
const updateSubscriptionUser = require('./users/updateSubscriptionUser')

module.exports = {
    add,
    deleteById,
    getAll,
    getById,
    updateById,
    updateStatusContact,
    register,
    login,
    getCurrent,
    logout,
    updateSubscriptionUser
};