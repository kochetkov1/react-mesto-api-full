import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return /^https?:\/\/(www.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9]+[\w-._~:/?#[\]@!$'()*+,;=]*#?/.test(link);
      },
      message: (props) => `${props.value} - некорректный URL`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Card = mongoose.model('Card', cardSchema);
