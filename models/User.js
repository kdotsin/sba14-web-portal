import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt'
 
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String,
    minlength: 6,
    // Not required: OAuth users will log in via GitHub without a local password
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple users to have null/undefined githubId without triggering unique index errors
  },
});
 
// hash user password
userSchema.pre('save', async function () {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});
 
// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
 
const User = model('User', userSchema);
 
export default User;