const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers');
const {contactsSchema} = require('../../schema');
const {validation, ctrlWrapper} = require('../../middlewares');

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:id', ctrlWrapper(ctrl.getById));

router.post('/', validation(contactsSchema), ctrlWrapper(ctrl.add));

router.delete('/:id', ctrlWrapper(ctrl.deleteById));

router.put('/:id', validation(contactsSchema), ctrlWrapper(ctrl.updateById));

module.exports = router;
