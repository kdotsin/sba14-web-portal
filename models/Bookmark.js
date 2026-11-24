import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt'

const bookmarkSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
  },
}, { timestamps: true });

export const Bookmark = mongoose.model('Bookmark', bookmarkSchema);