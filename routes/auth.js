const { Router } = require('express');
const { check } = require('express-validator');
const {
  createUser,
  loginUser,
  renewToken,
} = require('../controllers/authController');

const router = Router();

router.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('password', 'El password debe contener mínimo 6 caracteres').isLength(
      { min: 6 }
    ),
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'El email no es válido').isEmail(),
    check('password', 'El password debe contener mínimo 6 caracteres').isLength(
      { min: 6 }
    ),
  ],
  loginUser
);

router.get('/renew', renewToken);

module.exports = router;
