const router = require('express').Router();
const multer = require('multer');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const authController = require('./controller');

passport.use(
  new LocalStrategy({ usernameField: 'email' }, authController.localStrategy)
);

router.post('/register', multer().none(), authController.register);
router.post('/login', multer().none(), authController.login);
router.get('/me', authController.me);

module.exports = router;
