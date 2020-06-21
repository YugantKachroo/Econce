const express = require('express');
const { check, body } = require('express-validator');

const {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
  getReset,
  postReset,
  getNewPassword,
  postNewPassword,
} = require('../controllers/auth');

const router = express.Router();

router.get('/login', getLogin);

router.get('/signup', getSignup);

router.post('/login', postLogin);

router.post(
  '/signup',
  [
    check('email').isEmail().withMessage('Please enter a valid email'),
    body('password', 'Password must be ateast 6 characters long').isLength({
      min: 6,
    }),
  ],
  postSignup
);

router.post('/logout', postLogout);

router.get('/reset', getReset);

router.post('/reset', postReset);

router.get('/reset/:token', getNewPassword);

router.post('/new-password', postNewPassword);

module.exports = router;
