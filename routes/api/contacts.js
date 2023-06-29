const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers');
const {joiSchema, favoriteJoiSchema} = require('../../models/contact');
const {validation, ctrlWrapper, isValidId} = require('../../middlewares');

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:id', isValidId, ctrlWrapper(ctrl.getById));

router.post('/', validation(joiSchema), ctrlWrapper(ctrl.add));

router.delete('/:id', isValidId, ctrlWrapper(ctrl.deleteById));

router.put('/:id', isValidId, validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.patch('/:id/favorite', isValidId, validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
