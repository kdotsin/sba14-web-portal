import e from 'express';
import User from '../../models/User.js';
import { signToken } from '../../utils/auth.js';
import passport from 'passport';

const router = e.Router();

router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    };

    const token = signToken(user);
    res.status(201).json({ token, user: payload });
  } catch (err) {
    res.status(400).json({ error: 'cannot create user', details: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
 
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }
  
    const correctPw = await user.isCorrectPassword(req.body.password);
  
    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    };
  
    const token = signToken(user);
    res.json({ token, user: payload });
  } catch (err) {
    res.status(500).json({ error: 'cannot log in', details: err.message})
  }
});

router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    session: false 
  }),
  (req, res) => {
    res.json(req.user)
  }
)
 
export default router;