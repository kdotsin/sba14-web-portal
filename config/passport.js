import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.js";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL

    },
    async (accessTocket, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ githubId: profile.id })

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          username: profile.username,
          githubId: profile.id,
          email: profile._json.email,
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        done(err);
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});