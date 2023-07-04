const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers');
const {joiSchema, favoriteJoiSchema} = require('../../models/contact');
const {auth, validation, ctrlWrapper, isValidId} = require('../../middlewares');

router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:id', auth, isValidId, ctrlWrapper(ctrl.getById));

router.post('/', auth, validation(joiSchema), ctrlWrapper(ctrl.add));

router.delete('/:id', auth, isValidId, ctrlWrapper(ctrl.deleteById));

router.put('/:id', auth, isValidId, validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.patch('/:id/favorite', auth, isValidId, validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
