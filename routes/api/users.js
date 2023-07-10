const express = require('express');
const {auth, validation, upload, ctrlWrapper} = require('../../middlewares');
const ctrl = require('../../controllers');
const {joiSubscriptionSchema} = require('../../models/user');

const router = express.Router();

router.patch("/", auth, validation(joiSubscriptionSchema), ctrlWrapper(ctrl.updateSubscriptionUser));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;