const {Schema, model} = require('mongoose');
const Joi = require("joi");
const bcrypt = require('bcryptjs');
const {handleMongooseError} = require('../helpers');

const subscriptionList = ["starter", "pro", "business"];


const userSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minlength: 6
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter"
    },
    token: {
        type: String,
        default: null
    },
    avatarURL: {
      type: String,
      required: true
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  }, {versionKey: false,timestamps: true});

  userSchema.methods.setPassword = function(password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };

  userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  userSchema.post('save', handleMongooseError);

  const joiAuthSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().valid(...subscriptionList)
  });

  const joiLoginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required()
  });

  const joiSubscriptionSchema = Joi.object({
    subscription: Joi.string().required().valid(...subscriptionList)
  });

  const joiEmailSchema = Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'missing required field email',
    }),
  })

  const User = model("user", userSchema);

  module.exports = {
    User,
    joiAuthSchema,
    joiLoginSchema,
    joiSubscriptionSchema,
    joiEmailSchema
  }