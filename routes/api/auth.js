const express = require('express');

const {auth, validation, ctrlWrapper} = require('../../middlewares');
const ctrl = require('../../controllers');
const {joiAuthSchema, joiLoginSchema} = require('../../models/user')

const router = express.Router();

router.post('/register', validation(joiAuthSchema), ctrlWrapper(ctrl.register));

router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

module.exports = router;