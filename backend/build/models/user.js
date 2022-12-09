import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { errorMessages } from '../utils/errorMessages.js';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator(link) {
          return /^https?:\/\/(www.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9]+[\w-._~:/?#[\]@!$'()*+,;=]*#?/.test(link);
        },
        message: (props) => `${props.value} - некорректный URL`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: (props) => `${props.value} - некорректный E-mail`,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(errorMessages.unauthorized));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError(errorMessages.unauthorized));
        }
        return user;
      });
    });
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;

  return user;
};

export const User = mongoose.model('User', userSchema);
