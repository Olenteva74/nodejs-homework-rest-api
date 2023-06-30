const {Schema, model} = require('mongoose');
const Joi = require("joi");

const phoneRegexp = /\(\d{3}\)\s\d{3}-\d{4}$/;

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      match: phoneRegexp,
      unique: true,
      required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }, {versionKey: false,timestamps: true});

const Contact = model("contact", contactSchema);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.bool()
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required().messages({
    'any.required': 'missing field favorite',
  }),
})

module.exports = {
  Contact, 
  joiSchema,
  favoriteJoiSchema
};

